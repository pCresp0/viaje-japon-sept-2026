import fs from 'fs';
const file = 'src/pages/CalendarPage.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Update component signature
content = content.replace(
  'export default function CalendarPage() {',
  'export default function CalendarPage({ onGoToDayQuickView }) {'
);

// 2. Remove state
content = content.replace(
  'const [selectedDayNum, setSelectedDayNum] = useState(null);\n',
  ''
);

// 3. Remove selectedDay assignment
content = content.replace(
  'const selectedDay = selectedDayNum ? days.find((d) => d.num === selectedDayNum) : null;\n',
  ''
);

// 4. Update onClick handler
content = content.replace(
  /onClick=\{\(\) => tripDay && setSelectedDayNum\(tripDay\.num\)\}/g,
  'onClick={() => tripDay && onGoToDayQuickView(tripDay.num)}'
);

// 5. Remove isSelected logic
content = content.replace(
  'const isSelected = tripDay && tripDay.num === selectedDayNum;\n',
  'const isSelected = false;\n'
);

// 6. Delete the Day detail panel and Modal
// We can use regex to delete from `{/* Day detail panel — right side (desktop only, fixed width) */}` to the end of the modal.
const regex = /\{\/\* Day detail panel — right side \(desktop only, fixed width\) \*\/\}[\s\S]*?<\/div>,\n\s*document\.body\n\s*\)}/m;
content = content.replace(regex, '');

fs.writeFileSync(file, content);
