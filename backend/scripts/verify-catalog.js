import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:4000/api';

async function verify() {
  try {
    // 1. Login
    console.log('Logging in...');
    const loginRes = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'demo@medumentor.com', password: 'password123' })
    });
    
    if (!loginRes.ok) {
      throw new Error(`Login failed: ${loginRes.status} ${await loginRes.text()}`);
    }
    
    const { token } = await loginRes.json();
    console.log('Login successful. Token acquired.');

    const headers = { 'Authorization': `Bearer ${token}` };

    // 2. Fetch Programs
    console.log('Fetching Programs...');
    const progRes = await fetch(`${BASE_URL}/catalog/programs`, { headers });
    const programs = await progRes.json();
    console.log('Programs:', JSON.stringify(programs, null, 2));

    // 3. Fetch Stages
    console.log('Fetching Stages...');
    const stageRes = await fetch(`${BASE_URL}/catalog/stages`, { headers });
    const stages = await stageRes.json();
    console.log('Stages:', JSON.stringify(stages, null, 2));
    
    if (stages.length > 0) {
      const stageId = stages[0].id;
      // 4. Fetch Subjects
      console.log(`Fetching Subjects for Stage ${stageId}...`);
      const subRes = await fetch(`${BASE_URL}/catalog/subjects?stageId=${stageId}`, { headers });
      const subjects = await subRes.json();
      console.log('Subjects:', JSON.stringify(subjects, null, 2));
      
      if (subjects.length > 0) {
        const subjectId = subjects[0].id;
        // 5. Fetch Modules
        console.log(`Fetching Modules for Subject ${subjectId}...`);
        const modRes = await fetch(`${BASE_URL}/catalog/modules?subjectId=${subjectId}`, { headers });
        const modules = await modRes.json();
        console.log('Modules:', JSON.stringify(modules, null, 2));

        if (modules.length > 0) {
          const moduleId = modules[0].id;
          // 6. Fetch Module Details (Deep)
          console.log(`Fetching Details for Module ${moduleId}...`);
          const detailRes = await fetch(`${BASE_URL}/catalog/modules/${moduleId}/details`, { headers });
          const details = await detailRes.json();
          console.log('Module Details:', JSON.stringify(details, null, 2));
        }
      }
    }

  } catch (error) {
    console.error('Verification failed:', error);
  }
}

verify();
