import fs from 'fs';
const text = fs.readFileSync('scratch/big_data.json', 'utf-8');
const data = JSON.parse(text);

for (const key of Object.keys(data)) {
    console.log(key, JSON.stringify(data[key]).length);
}
