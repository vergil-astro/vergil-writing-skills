#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');

const skillFile = path.resolve(__dirname, '..', 'vergil-writing-skills.skill');
const skillMd = path.resolve(__dirname, '..', 'SKILL.md');
const pkg = require('../package.json');

// ─── Helpers ────────────────────────────────────────────────────────────────

function fileExists(p) {
    try {
        fs.accessSync(p);
        return true;
    } catch {
        return false;
    }
}

function which(cmd) {
    try {
        execSync(`command -v ${cmd}`, { stdio: 'pipe' });
        return true;
    } catch {
        return false;
    }
}

function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

function copyFile(src, dest) {
    ensureDir(path.dirname(dest));
    fs.copyFileSync(src, dest);
}

function extractSkillMd(skillPath, destPath) {
    try {
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'vergil-skill-'));
        execSync(`unzip -o "${skillPath}" -d "${tmpDir}"`, { stdio: 'pipe' });
        const found = execSync(
            `find "${tmpDir}" -name "SKILL.md"`,
            { encoding: 'utf8', stdio: 'pipe' }
        ).trim();
        if (found) {
            ensureDir(path.dirname(destPath));
            fs.copyFileSync(found.split('\n')[0], destPath);
            return true;
        }
    } catch {
        // noop
    }
    return false;
}

// ─── Agent Detection ────────────────────────────────────────────────────────

const agents = {
    claude: {
        name: 'Claude Code',
        detect() {
            return which('claude') || fileExists(path.join(os.homedir(), '.claude'));
        },
        install() {
            const skillDir = path.join(os.homedir(), '.claude', 'skills', 'vergil-writing-skills');
            const dest = path.join(skillDir, 'SKILL.md');

            if (fileExists(skillMd)) {
                copyFile(skillMd, dest);
                console.log(`   -> ${dest}`);
                return true;
            }

            if (extractSkillMd(skillFile, dest)) {
                console.log(`   -> ${dest}`);
                return true;
            }

            console.log('   [WARN] SKILL.md not available in package');
            return false;
        }
    },
    openclaw: {
        name: 'OpenClaw',
        detect() {
            return which('openclaw');
        },
        install() {
            try {
                execSync(`openclaw skills install "${skillFile}"`, { stdio: 'inherit' });
                return true;
            } catch {
                return false;
            }
        }
    }
};

// ─── Help / Version ─────────────────────────────────────────────────────────

if (process.argv.includes('--help') || process.argv.includes('-h')) {
    console.log(`
${pkg.name} v${pkg.version}
  ${pkg.description}

Usage:
  npx ${pkg.name}              Detect agents and install skill
  npx ${pkg.name} --local      Install to local .claude/skills/ (current project)
  npx ${pkg.name} --help       Show this help
  npx ${pkg.name} --version    Show version

Supported agents:
  - Claude Code   -> ~/.claude/skills/vergil-writing-skills/SKILL.md
  - OpenClaw      -> via openclaw skills install

If no supported agent is detected, manual instructions will be shown.

More info: ${pkg.homepage || pkg.repository?.url || 'https://github.com/vergil-astro/vergil-writing-skills'}
`);
    process.exit(0);
}

if (process.argv.includes('--version') || process.argv.includes('-v')) {
    console.log(pkg.version);
    process.exit(0);
}

// ─── Main ───────────────────────────────────────────────────────────────────

console.log(`\n${pkg.name} v${pkg.version}`);
console.log('   Installing Vergil writing skill to detected agents\n');

if (!fileExists(skillFile)) {
    console.error('[ERROR] vergil-writing-skills.skill not found');
    process.exit(1);
}

const isLocal = process.argv.includes('--local');

// Handle --local flag: install to current project's .claude/skills/
if (isLocal) {
    const projectSkillDir = path.resolve('.claude', 'skills', 'vergil-writing-skills');
    const dest = path.join(projectSkillDir, 'SKILL.md');

    if (fileExists(skillMd)) {
        copyFile(skillMd, dest);
        console.log(`[OK] Installed to project-local: ${dest}`);
        process.exit(0);
    }

    if (extractSkillMd(skillFile, dest)) {
        console.log(`[OK] Installed to project-local: ${dest}`);
        process.exit(0);
    }

    console.error('[ERROR] Failed to install locally. SKILL.md could not be extracted.');
    process.exit(1);
}

// Auto-detect and install to all available agents
let installedCount = 0;
let detectedCount = 0;

for (const [, agent] of Object.entries(agents)) {
    if (agent.detect()) {
        detectedCount++;
        console.log(`[DETECTED] ${agent.name}`);
        if (agent.install()) {
            installedCount++;
            console.log(`   [OK] ${agent.name}: installed`);
        } else {
            console.log(`   [FAIL] ${agent.name}: install failed`);
        }
    }
}

// Summary
console.log('');

if (installedCount > 0) {
    console.log(`[OK] Skill installed on ${installedCount} agent(s)`);
    console.log('   Try asking: "帮我排版一下这篇文章" or "Enhance my article with Vergil directives"');
} else if (detectedCount === 0) {
    console.log('[WARN] No supported AI agent detected on this system.');
    console.log('');
    console.log('Manual installation options:');
    console.log('');
    console.log('  Claude Code (global):');
    console.log('    mkdir -p ~/.claude/skills/vergil-writing-skills');
    console.log('    # Copy SKILL.md to:');
    console.log('    ~/.claude/skills/vergil-writing-skills/SKILL.md');
    console.log('');
    console.log('  Claude Code (project-local):');
    console.log(`    npx ${pkg.name} --local`);
    console.log('');
    console.log('  OpenClaw:');
    console.log(`    openclaw skills install "${skillFile}"`);
    console.log('');
} else {
    console.log('[ERROR] Install failed for all detected agents');
    process.exit(1);
}
