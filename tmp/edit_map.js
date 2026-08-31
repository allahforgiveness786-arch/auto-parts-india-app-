const fs = require('fs');
const filePath = '/app/applet/react-native-app/src/screens/ProductDetailScreen.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const oldBlock = "        <GMap          latitude={partLat}          longitude={partLng}          state={part.state}          district={part.district || part.location}          title={`${part.title} - ${part.location || 'India'}`}          interactive={false}          style={{ marginBottom: 16 }}        />";
const newBlock = "        <GMap\n          latitude={partLat}\n          longitude={partLng}\n          state={part.state}\n          district={part.district || part.location}\n          title={`${part.title} - ${part.location || 'India'}`}\n          interactive={false}\n          style={{ marginBottom: 16 }}\n          height={250}\n        />";

if (!content.includes(oldBlock)) {
    console.error("Could not find old block!");
    process.exit(1);
}

content = content.replace(oldBlock, newBlock);
fs.writeFileSync(filePath, content);
console.log("Successfully updated map height");
