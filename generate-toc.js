const fs = require('fs');
const path = require('path');

const ADR_START = '<!-- adrlog -->\n'
const ADR_STOP = '<!-- adrlogstop -->\n'

const generateToc = () => {
  const adrDir = fs.readFileSync('.adr-dir', 'utf8').trim();
  return fs.readdirSync(adrDir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const num = file.split('-')[0];
      const lines = fs.readFileSync(path.join(adrDir, file), 'utf8').split('\n');
      const firstLine = lines[0].substring(2);
      const dotIndex = firstLine.indexOf('.');
      const title = dotIndex !== -1 ? firstLine.substring(dotIndex + 1).trim() : firstLine.trim();
      let superseded = false;
      for (var i = 1; i < lines.length; i+=1) {
        if (lines[i] === '## Status') {
          const statusLine = lines[i +2];
          if (statusLine.startsWith('Superceded') || statusLine.startsWith('Superseded')) {
            superseded = true;
          }
          break;
        }
      }
      return {
        file,
        num,
        title,
        superseded,
      };
    })
    .sort((a, b) => a.num.localeCompare(b.num))
    .map(({file, num, title, superseded}) => {
      let markdown = '';
      if (superseded) {
        markdown += '~~';
      }
      markdown += `[ADR-${num}](${adrDir}/${file}) - ${title.trim()}`
      if (superseded) {
        markdown += '~~';
      }
      return `  * ${markdown}`;
    }).join('\n');
};

fs.readdirSync('.')
  .filter((file) => file.endsWith('.md'))
  .forEach((file) => {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes(ADR_START)) {
      const regex = new RegExp(`${ADR_START}(.*?)${ADR_STOP}`, 's');
      const replaced = content.replace(regex, `${ADR_START}\n${generateToc()}\n\n${ADR_STOP}`);
      fs.writeFileSync(file, replaced, 'utf8');
    }
  });
