const path = require('path');
const fs = require('fs');

/**
 * Vergil Writing Skill - Programmatic API
 *
 * Provides paths to the bundled skill files for programmatic installation.
 */

function getSkillFilePath() {
    return path.resolve(__dirname, 'vergil-writing-skills.skill');
}

function getSkillMdPath() {
    const mdPath = path.resolve(__dirname, 'SKILL.md');
    if (fs.existsSync(mdPath)) {
        return mdPath;
    }
    return null;
}

function getSkillInfo() {
    return {
        name: 'vergil-writing-skills',
        version: require('./package.json').version,
        description: 'Write, typeset and enhance Vergil Astro theme articles (kami rules + Vergil directives)',
        skillFile: getSkillFilePath(),
        skillMd: getSkillMdPath()
    };
}

module.exports = {
    getSkillFilePath,
    getSkillMdPath,
    getSkillInfo
};
