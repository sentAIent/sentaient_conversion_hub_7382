import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs/promises';
import * as path from 'path';

// Supabase Connection
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function syncTemplates() {
  const templatesDir = path.join(process.cwd(), 'documents', 'templates', 'templates');
  
  try {
    const files = await fs.readdir(templatesDir);
    console.log(`Found ${files.length} templates. Starting sync...`);

    for (const file of files) {
      if (!file.endsWith('.md')) continue; // only import markdown templates
      
      const filePath = path.join(templatesDir, file);
      const content = await fs.readFile(filePath, 'utf-8');
      const title = file.replace('.md', '').replace(/-/g, ' ');

      // Upsert to DB
      const { data, error } = await supabase
        .from('documents')
        .upsert(
          { 
            title: title, 
            content: content, 
            is_template: true,
            status: 'published'
          },
          { onConflict: 'title' }
        );

      if (error) {
        console.error(`Failed to sync ${title}:`, error);
      } else {
        console.log(`Successfully synced: ${title}`);
      }
    }

    console.log("Template sync completed successfully.");
  } catch (err) {
    console.error("Error reading templates directory:", err);
  }
}

syncTemplates();
