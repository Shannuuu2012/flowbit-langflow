import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  const flowsDir = path.join(process.cwd(), 'flows');
  const files = fs.readdirSync(flowsDir).filter(file => file.endsWith('.json'));

  const flows = files.map(file => {
    const name = file.replace('.json', '');
    return {
      id: name,
      name: name.charAt(0).toUpperCase() + name.slice(1),
      engine: 'langflow'
    };
  });

  return NextResponse.json(flows);
}


