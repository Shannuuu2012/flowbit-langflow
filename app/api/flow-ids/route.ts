import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  const flowsDir = path.join(process.cwd(), 'flows');
  const files = fs.readdirSync(flowsDir).filter(file => file.endsWith('.json'));

  const ids = files.map((file) => {
    const filePath = path.join(flowsDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const json = JSON.parse(content);

    return {
      name: file.replace('.json', ''),
      id: json.flow_id || json.id || 'UNKNOWN',
    };
  });

  return NextResponse.json(ids);
}
