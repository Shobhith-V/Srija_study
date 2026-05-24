/* ════════════════════════════════════════════════════════════════════════
   CODEX — application logic
   ════════════════════════════════════════════════════════════════════════ */

const API = "https://api.anthropic.com/v1/messages";
// HARDCODED_KEY is defined in config.js (gitignored) — paste your key there

/* ─── DEFAULT TOPIC TREES ─────────────────────────────────────────────── */
function DT(s){
  const M = {
    anatomy: [
      {id:'a1',ch:'Upper Limb',book:'Vishram Singh Vol.1',topics:[{id:'a1t1',name:'Bones & joints of upper limb',done:false},{id:'a1t2',name:'Shoulder joint & rotator cuff',done:false},{id:'a1t3',name:'Brachial plexus — formation, branches, injuries',done:false},{id:'a1t4',name:'Muscles: arm, forearm, hand',done:false},{id:'a1t5',name:'Carpal tunnel — contents & syndrome',done:false},{id:'a1t6',name:'Cubital fossa',done:false},{id:'a1t7',name:'Axilla & contents',done:false}]},
      {id:'a2',ch:'Lower Limb',book:'Vishram Singh Vol.1',topics:[{id:'a2t1',name:'Bones & joints of lower limb',done:false},{id:'a2t2',name:'Hip joint — movements & dislocation',done:false},{id:'a2t3',name:'Knee joint & popliteal fossa',done:false},{id:'a2t4',name:'Femoral triangle & canal',done:false},{id:'a2t5',name:'Femoral & sciatic nerves',done:false},{id:'a2t6',name:'Foot arches',done:false}]},
      {id:'a3',ch:'Thorax',book:'Vishram Singh Vol.2',topics:[{id:'a3t1',name:'Thoracic wall & intercostal spaces',done:false},{id:'a3t2',name:'Lungs, pleura & bronchopulmonary segments',done:false},{id:'a3t3',name:'Heart — chambers, valves, blood supply',done:false},{id:'a3t4',name:'Pericardium',done:false},{id:'a3t5',name:'Mediastinum',done:false}]},
      {id:'a4',ch:'Abdomen & Pelvis',book:'Vishram Singh Vol.2',topics:[{id:'a4t1',name:'Anterior abdominal wall & muscles',done:false},{id:'a4t2',name:'Inguinal canal & hernia',done:false},{id:'a4t3',name:'Peritoneum & peritoneal cavity',done:false},{id:'a4t4',name:'GI tract — stomach, intestines',done:false},{id:'a4t5',name:'Liver, gallbladder & biliary apparatus',done:false},{id:'a4t6',name:'Kidney & suprarenal glands',done:false}]},
      {id:'a5',ch:'Head & Neck',book:'Vishram Singh Vol.3',topics:[{id:'a5t1',name:'Skull — bones, foramina, fossae',done:false},{id:'a5t2',name:'Cranial nerves (all 12)',done:false},{id:'a5t3',name:'Neck triangles',done:false},{id:'a5t4',name:'Meninges & dural venous sinuses',done:false},{id:'a5t5',name:'Orbit & eyeball',done:false},{id:'a5t6',name:'Ear — external, middle, inner',done:false}]},
      {id:'a6',ch:'Neuroanatomy',book:'Vishram Singh Vol.3',topics:[{id:'a6t1',name:'Spinal cord — structure & tracts',done:false},{id:'a6t2',name:'Brain stem',done:false},{id:'a6t3',name:'Cerebellum & basal ganglia',done:false},{id:'a6t4',name:'Cerebral cortex & lobes',done:false},{id:'a6t5',name:'Autonomic nervous system',done:false},{id:'a6t6',name:'Blood supply of brain',done:false}]},
      {id:'a7',ch:'Histology',book:'Vishram Singh',topics:[{id:'a7t1',name:'Epithelial tissues',done:false},{id:'a7t2',name:'Connective tissues',done:false},{id:'a7t3',name:'Muscle tissue',done:false},{id:'a7t4',name:'Nervous tissue',done:false},{id:'a7t5',name:'Histology of organs (liver, kidney, lung, skin)',done:false}]},
      {id:'a8',ch:'Embryology',book:'Vishram Singh',topics:[{id:'a8t1',name:'Gametogenesis & fertilisation',done:false},{id:'a8t2',name:'Early development — cleavage to implantation',done:false},{id:'a8t3',name:'Fetal membranes & placenta',done:false},{id:'a8t4',name:'Limb development',done:false},{id:'a8t5',name:'Congenital anomalies',done:false}]}
    ],
    physiology: [
      {id:'p1',ch:'General & Cell Physiology',book:'GK Pal',topics:[{id:'p1t1',name:'Cell membrane transport',done:false},{id:'p1t2',name:'Action potential',done:false},{id:'p1t3',name:'Neuromuscular junction',done:false},{id:'p1t4',name:'Muscle contraction mechanism',done:false}]},
      {id:'p2',ch:'Blood',book:'GK Pal / Guyton',topics:[{id:'p2t1',name:'Plasma proteins & functions',done:false},{id:'p2t2',name:'RBCs, haemoglobin & anaemia',done:false},{id:'p2t3',name:'WBCs & immunity overview',done:false},{id:'p2t4',name:'Platelets & haemostasis',done:false},{id:'p2t5',name:'Coagulation cascade',done:false},{id:'p2t6',name:'Blood groups — ABO & Rh',done:false},{id:'p2t7',name:'ESR & clinical significance',done:false}]},
      {id:'p3',ch:'Cardiovascular',book:'GK Pal / Guyton',topics:[{id:'p3t1',name:'Cardiac cycle',done:false},{id:'p3t2',name:'ECG — waves, intervals, leads',done:false},{id:'p3t3',name:'Cardiac output & regulation',done:false},{id:'p3t4',name:'Blood pressure — baroreceptors, RAAS',done:false},{id:'p3t5',name:'Heart sounds & murmurs',done:false},{id:'p3t6',name:'Microcirculation & lymph',done:false}]},
      {id:'p4',ch:'Respiratory',book:'GK Pal / Guyton',topics:[{id:'p4t1',name:'Mechanics of breathing',done:false},{id:'p4t2',name:'Lung volumes & capacities',done:false},{id:'p4t3',name:'O₂ & CO₂ transport',done:false},{id:'p4t4',name:'Control of respiration',done:false},{id:'p4t5',name:'Hypoxia types',done:false}]},
      {id:'p5',ch:'Gastrointestinal',book:'GK Pal / Guyton',topics:[{id:'p5t1',name:'Salivary & gastric secretions',done:false},{id:'p5t2',name:'Pancreatic & bile secretion',done:false},{id:'p5t3',name:'Digestion & absorption',done:false},{id:'p5t4',name:'GI motility',done:false}]},
      {id:'p6',ch:'Renal',book:'GK Pal / Guyton',topics:[{id:'p6t1',name:'Glomerular filtration — GFR',done:false},{id:'p6t2',name:'Tubular reabsorption & secretion',done:false},{id:'p6t3',name:'Concentration & dilution of urine',done:false},{id:'p6t4',name:'Acid-base balance',done:false},{id:'p6t5',name:'Micturition reflex',done:false}]},
      {id:'p7',ch:'Endocrinology',book:'GK Pal / Guyton',topics:[{id:'p7t1',name:'Hypothalamus-pituitary axis',done:false},{id:'p7t2',name:'Thyroid hormones',done:false},{id:'p7t3',name:'Adrenal cortex & medulla',done:false},{id:'p7t4',name:'Insulin, glucagon & diabetes',done:false},{id:'p7t5',name:'Calcium regulation — PTH, Vit D',done:false},{id:'p7t6',name:'Reproductive hormones',done:false}]},
      {id:'p8',ch:'Neurophysiology',book:'GK Pal / Guyton',topics:[{id:'p8t1',name:'Sensory pathways',done:false},{id:'p8t2',name:'Motor pathways — pyramidal & extrapyramidal',done:false},{id:'p8t3',name:'Reflexes',done:false},{id:'p8t4',name:'EEG & sleep',done:false},{id:'p8t5',name:'Higher functions — memory, speech',done:false}]}
    ],
    biochemistry: [
      {id:'b1',ch:'Biomolecules',book:'Vasudevan',topics:[{id:'b1t1',name:'Carbohydrates — structure & classification',done:false},{id:'b1t2',name:'Lipids — classification & structure',done:false},{id:'b1t3',name:'Proteins — structure (1° to 4°)',done:false},{id:'b1t4',name:'Nucleotides & nucleic acids',done:false}]},
      {id:'b2',ch:'Enzymes',book:'Vasudevan',topics:[{id:'b2t1',name:'Enzyme kinetics — Km, Vmax, Michaelis-Menten',done:false},{id:'b2t2',name:'Enzyme inhibition types',done:false},{id:'b2t3',name:'Isoenzymes & clinical use (LDH, CPK, ALP)',done:false},{id:'b2t4',name:'Coenzymes & vitamins as cofactors',done:false},{id:'b2t5',name:'Regulation of enzyme activity',done:false}]},
      {id:'b3',ch:'Carbohydrate Metabolism',book:'Vasudevan',topics:[{id:'b3t1',name:'Glycolysis — steps, enzymes, ATP yield',done:false},{id:'b3t2',name:'Pyruvate dehydrogenase complex',done:false},{id:'b3t3',name:'TCA / Krebs cycle',done:false},{id:'b3t4',name:'ETC & oxidative phosphorylation',done:false},{id:'b3t5',name:'Gluconeogenesis',done:false},{id:'b3t6',name:'Glycogen metabolism',done:false},{id:'b3t7',name:'HMP shunt / Pentose phosphate pathway',done:false},{id:'b3t8',name:'Diabetes mellitus — biochemistry',done:false}]},
      {id:'b4',ch:'Lipid Metabolism',book:'Vasudevan',topics:[{id:'b4t1',name:'β-oxidation of fatty acids',done:false},{id:'b4t2',name:'Fatty acid synthesis',done:false},{id:'b4t3',name:'Ketone body metabolism',done:false},{id:'b4t4',name:'Cholesterol synthesis & regulation',done:false},{id:'b4t5',name:'Bile acid metabolism',done:false},{id:'b4t6',name:'Lipoproteins (VLDL, LDL, HDL)',done:false}]},
      {id:'b5',ch:'Amino Acid & Protein Metabolism',book:'Vasudevan',topics:[{id:'b5t1',name:'Transamination & deamination',done:false},{id:'b5t2',name:'Urea cycle — steps & enzymes',done:false},{id:'b5t3',name:'Essential amino acids',done:false},{id:'b5t4',name:'One-carbon metabolism & folate cycle',done:false},{id:'b5t5',name:'Porphyrin synthesis & jaundice',done:false},{id:'b5t6',name:'Phenylketonuria & inborn errors',done:false}]},
      {id:'b6',ch:'Molecular Biology',book:'Vasudevan',topics:[{id:'b6t1',name:'DNA structure & replication',done:false},{id:'b6t2',name:'Transcription & RNA processing',done:false},{id:'b6t3',name:'Translation & genetic code',done:false},{id:'b6t4',name:'Gene regulation',done:false},{id:'b6t5',name:'Mutations, repair & cancer',done:false},{id:'b6t6',name:'Recombinant DNA & PCR',done:false}]},
      {id:'b7',ch:'Clinical & Applied Biochemistry',book:'Vasudevan',topics:[{id:'b7t1',name:'Liver function tests',done:false},{id:'b7t2',name:'Renal function tests',done:false},{id:'b7t3',name:'Blood glucose tests & HbA1c',done:false},{id:'b7t4',name:'Plasma proteins & electrophoresis',done:false},{id:'b7t5',name:'Vitamins — fat & water soluble',done:false},{id:'b7t6',name:'Minerals & trace elements',done:false}]}
    ]
  };
  return M[s] || [];
}

/* ─── STATE ───────────────────────────────────────────────────────────── */
let S = JSON.parse(localStorage.getItem('medtrack') || 'null') || {
  tasks: [], exams: [], flashcards: [],
  topics: { anatomy: DT('anatomy'), physiology: DT('physiology'), biochemistry: DT('biochemistry') },
  streak: {}, advHist: []
};
function save(){ localStorage.setItem('medtrack', JSON.stringify(S)); }
function gk(){ return HARDCODED_KEY || localStorage.getItem('mt_key') || ''; }

/* ─── THEME ───────────────────────────────────────────────────────────── */
function getTheme(){ return localStorage.getItem('codex_theme') || 'light'; }
function setTheme(t){
  document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem('codex_theme', t);
  const el = document.getElementById('theme-icon');
  if(el) el.innerHTML = t==='dark'
    ? '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor"/>'
    : '<circle cx="12" cy="12" r="4" fill="currentColor"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>';
  const lbl = document.getElementById('theme-lbl');
  if(lbl) lbl.textContent = t==='dark' ? 'Dark' : 'Light';
}
function toggleTheme(){ setTheme(getTheme()==='light' ? 'dark' : 'light'); }

/* ─── NAVIGATION ──────────────────────────────────────────────────────── */
const PTITLES = {
  dashboard:'Dashboard', schedule:'The Daily Docket', exams:'Examinations',
  anatomy:'Anatomy', physio:'Physiology', biochem:'Biochemistry',
  advisor:'Counsel', flashcards:'Card Catalogue', settings:'Settings'
};
const PFOLIOS = {
  dashboard:'today at a glance',
  schedule:'tasks & revisions',
  exams:'upcoming & past',
  anatomy:'after Vishram Singh',
  physio:'after GK Pal & Guyton',
  biochem:'after D.M. Vasudevan',
  advisor:'your study counsel',
  flashcards:'spaced recall',
  settings:'preferences'
};

function nav(p){
  document.querySelectorAll('.page').forEach(x => x.classList.remove('active'));
  document.querySelectorAll('.ni').forEach(x => x.classList.remove('active'));
  const pageEl = document.getElementById('page-' + p);
  if(pageEl) pageEl.classList.add('active');
  document.querySelectorAll('.ni').forEach(x => {
    const oc = x.getAttribute('onclick');
    if(oc && oc.includes("'" + p + "'")) x.classList.add('active');
  });
  document.getElementById('ptitle').textContent = PTITLES[p] || p;
  const folio = document.getElementById('pfolio');
  if(folio) folio.textContent = PFOLIOS[p] || '';
  document.getElementById('sidebar').classList.remove('open');
  if(p==='dashboard') rdashFull();
  if(p==='schedule') rsched(cst);
  if(p==='exams') rexams();
  if(p==='anatomy') rsubj('anatomy');
  if(p==='physio') rsubj('physiology');
  if(p==='biochem') rsubj('biochemistry');
  if(p==='flashcards') rfcs();
  if(p==='settings'){
    const k = gk();
    if(k) document.getElementById('kfield').value = k;
    document.getElementById('kst').textContent = k ? '✓ Key saved' : 'No key saved yet.';
  }
}

/* ─── STATS ───────────────────────────────────────────────────────────── */
function sts(s){
  let t = 0, d = 0;
  S.topics[s].forEach(c => c.topics.forEach(x => { t++; if(x.done) d++; }));
  return { t, d, pct: t ? Math.round(d/t * 100) : 0 };
}

/* ─── DASHBOARD ───────────────────────────────────────────────────────── */
function rdash(){
  const apw = document.getElementById('apiwarn');
  if(!gk()) apw.style.display = 'flex'; else apw.style.display = 'none';

  [['anatomy','a'],['physiology','p'],['biochemistry','b']].forEach(([s, k]) => {
    const st = sts(s);
    document.getElementById('d'+k+'p').textContent = st.pct;
    document.getElementById('dp'+k+'p').style.width = st.pct+'%';
    document.getElementById('d'+k+'l').innerHTML = '<span class="big">'+st.d+'</span> / '+st.t+' topics';
  });

  const now = new Date(); now.setHours(0,0,0,0);
  const up = S.exams.filter(e => new Date(e.date) >= now)
    .sort((a,b) => new Date(a.date) - new Date(b.date)).slice(0, 3);
  document.getElementById('dexams').innerHTML = up.length
    ? up.map(e => {
        const dl = Math.ceil((new Date(e.date) - new Date())/864e5);
        return `<div class="trow" style="padding:10px 0">
          <div style="min-width:36px;text-align:center">
            <div style="font-family:var(--serif);font-size:18px;font-weight:500;line-height:1">${new Date(e.date).getDate()}</div>
            <div style="font-family:var(--serif);font-style:italic;font-size:9px;color:var(--ink-3);letter-spacing:.1em;text-transform:uppercase">${new Date(e.date).toLocaleString('default',{month:'short'})}</div>
          </div>
          <div style="flex:1;min-width:0">
            <div style="font-size:13.5px;font-weight:500">${e.name}</div>
            <div style="font-size:11px;color:var(--ink-3);font-style:italic;font-family:var(--serif)">${e.type.replace(/_/g, ' · ')}</div>
          </div>
          <div style="text-align:right;flex-shrink:0">
            <span class="badge b-${sc(e.subject)}">${e.subject}</span>
            ${dl>0?'<div style="font-size:10px;color:var(--ink-3);margin-top:3px" class="mono">'+dl+'d</div>':''}
          </div>
        </div>`;
      }).join('')
    : '<div class="empty"><span class="empty-orn">· ❦ ·</span>No examinations on the horizon</div>';

  const tod = new Date().toISOString().split('T')[0];
  const tt = S.tasks.filter(t => t.date === tod);
  document.getElementById('dtoday').innerHTML = tt.length
    ? tt.map(t => `<div class="trow"><div class="tck ${t.done?'done':''}" onclick="ttask('${t.id}');rdash()"></div><span class="tnm ${t.done?'done':''}">${t.name}</span><span class="badge b-${sc(t.subject)}" style="font-size:10px">${t.subject}</span></div>`).join('')
    : '<div class="empty"><span class="empty-orn">· ❦ ·</span>Nothing scheduled. A free hour for whatever calls you.</div>';

  rstreak();
}

function rstreak(){
  const g = document.getElementById('sgrid'), today = new Date();
  let html = '', streak = 0;
  for(let i = 29; i >= 0; i--){
    const d = new Date(today); d.setDate(d.getDate() - i);
    const k = d.toISOString().split('T')[0];
    html += `<div class="sdot2 ${S.streak[k]?'done':''} ${i===0?'today':''}" title="${k}"></div>`;
  }
  g.innerHTML = html;
  const d2 = new Date();
  while(S.streak[d2.toISOString().split('T')[0]]){ streak++; d2.setDate(d2.getDate() - 1); }
  document.getElementById('sbadge').innerHTML = streak > 0 ? '<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14a8 8 0 0 0 16 0C20 9.9 18.06 6.24 13.5.67zM12 20a4 4 0 0 1-4-4c0-1.87 1.04-3.25 2.66-4.39C10.86 13.07 12 14.17 12 16c0 2.5 3.5 2.65 3.5 0 0-1.31-.5-2.95-1.27-4.21C16.43 12.93 18 14.8 18 16a6 6 0 0 1-6 4z"/></svg>'+streak+'d' : '';
  const wstr = document.getElementById('wstreak-big');
  if(wstr) wstr.textContent = streak > 0 ? streak + (streak===1?' day':' days') : '';
  const wstrlbl = document.getElementById('wstreak-lbl');
  if(wstrlbl) wstrlbl.textContent = streak > 0 ? (streak===1?'day of study':'consecutive') : '';
}
function ms(){ S.streak[new Date().toISOString().split('T')[0]] = true; save(); }

/* ─── SUBJECT PAGES ───────────────────────────────────────────────────── */
const ROMAN = ['','I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'];

function rsubj(s){
  const pg = s==='physiology'?'physio' : s==='biochemistry'?'biochem' : s;
  const el = document.getElementById(pg[0]+'body');
  const st = sts(s), kk = s==='anatomy'?'a' : s==='physiology'?'p' : 'b';
  document.getElementById('pp'+kk).style.width = st.pct+'%';
  document.getElementById(kk+'ptxt').textContent = st.d+' / '+st.t+' done';
  const pctEl = document.getElementById(kk+'pct');
  if(pctEl) pctEl.textContent = st.pct + '%';
  el.innerHTML = S.topics[s].map((ch, i) => `
    <div class="chapter">
      <div class="chapter-head">
        <div class="ch-l">
          <div class="ch-num">Chapter ${ROMAN[i+1] || (i+1)}</div>
          <div class="ch-title">${ch.ch}</div>
          <div class="ch-book">${ch.book || ''}</div>
        </div>
        <div class="ch-actions">
          <button class="btn btn-g btn-sm" onclick="ach('${s}', '${ch.ch.replace(/'/g, "\\'")}')">Key topics</button>
          <button class="btn btn-g btn-sm" onclick="rch('${s}', '${ch.ch.replace(/'/g, "\\'")}')">Revise</button>
        </div>
      </div>
      ${ch.topics.map(t => `<div class="trow">
        <div class="tck ${t.done?'done':''}" onclick="ttopic('${s}', '${t.id}')"></div>
        <span class="tnm ${t.done?'done':''}">${t.name}</span>
        <div class="ch-topic-actions">
          <button class="icon-btn" title="Ask advisor" onclick="atopic('${s}', '${t.name.replace(/'/g, "\\'")}')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
          </button>
          <button class="icon-btn" title="Make flashcards" onclick="pfc('${s}', '${t.name.replace(/'/g, "\\'")}')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18"/></svg>
          </button>
        </div>
      </div>`).join('')}
    </div>`).join('');
}

function ttopic(s, id){
  S.topics[s].forEach(c => c.topics.forEach(t => { if(t.id === id){ t.done = !t.done; if(t.done) ms(); } }));
  save(); rsubj(s); upstats(s);
}
function upstats(s){
  const st = sts(s), kk = s==='anatomy'?'a' : s==='physiology'?'p' : 'b';
  const e = document.getElementById('d'+kk+'p');
  if(e){
    e.textContent = st.pct;
    document.getElementById('dp'+kk+'p').style.width = st.pct+'%';
    document.getElementById('d'+kk+'l').innerHTML = '<span class="big">'+st.d+'</span> / '+st.t+' topics';
  }
}

/* ─── TASKS / SCHEDULE ────────────────────────────────────────────────── */
let cst = 'week';
function stab(tab, el){
  cst = tab;
  document.querySelectorAll('#page-schedule .pill').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
  rsched(tab);
}
function addTask(){
  const n = document.getElementById('tn').value.trim();
  const d = document.getElementById('td').value;
  if(!n || !d){ alert('Please fill in the task and date'); return; }
  S.tasks.push({
    id: 't'+Date.now(), name: n,
    subject: document.getElementById('ts').value,
    date: d,
    type: document.getElementById('tt').value, done: false
  });
  save(); closeM('mt');
  document.getElementById('tn').value = '';
  rsched(cst);
}
function ttask(id){
  const t = S.tasks.find(x => x.id === id);
  if(t){ t.done = !t.done; if(t.done) ms(); save(); }
  rsched(cst);
}
function dtask(id){
  S.tasks = S.tasks.filter(x => x.id !== id);
  save(); rsched(cst);
}
function rsched(tab){
  const el = document.getElementById('scontent');
  const now = new Date(); now.setHours(0,0,0,0);
  let tasks = [...S.tasks];
  if(tab === 'week'){
    const end = new Date(now); end.setDate(now.getDate() + 7);
    tasks = tasks.filter(t => { const d = new Date(t.date); return d >= now && d <= end; });
  } else if(tab === 'revision'){
    tasks = tasks.filter(t => t.type === 'revision');
  }
  tasks.sort((a, b) => new Date(a.date) - new Date(b.date));
  if(!tasks.length){
    el.innerHTML = '<div class="empty"><span class="empty-orn">· ❦ ·</span>No tasks here yet. Ask Counsel to draft you a plan, or add one yourself.</div>';
    return;
  }
  const bd = {}; tasks.forEach(t => { if(!bd[t.date]) bd[t.date]=[]; bd[t.date].push(t); });
  const tod = new Date().toISOString().split('T')[0];
  el.innerHTML = Object.entries(bd).map(([d, ts]) => `<div class="sday">
    <h4>${fdf(d)} ${d===tod?'<span class="badge b-red" style="font-size:10px">Today</span>':''}</h4>
    <div class="sday-sub">${new Date(d).toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long'})}</div>
    ${ts.map(t => `<div class="tkrow">
      <div class="tkck ${t.done?'done':''}" onclick="ttask('${t.id}')"></div>
      <span class="tktxt ${t.done?'done':''}">${t.name}</span>
      <span class="badge b-${sc(t.subject)}" style="font-size:10px">${t.type}</span>
      <button class="icon-btn" style="color:var(--ink-4)" onclick="dtask('${t.id}')" title="Remove">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>
    </div>`).join('')}
  </div>`).join('');
}

/* ─── EXAMS ───────────────────────────────────────────────────────────── */
function addExam(){
  const n = document.getElementById('en').value.trim();
  const d = document.getElementById('ed').value;
  if(!n || !d){ alert('Please fill in name and date'); return; }
  const ex = {
    id: 'e'+Date.now(), name: n, date: d,
    subject: document.getElementById('es').value,
    type: document.getElementById('et').value,
    notes: document.getElementById('enotes').value
  };
  S.exams.push(ex); save(); autorev(ex);
  closeM('me');
  document.getElementById('en').value = '';
  document.getElementById('enotes').value = '';
  rexams();
  const big = ex.type.startsWith('prefinals') || ex.type.startsWith('finals');
  if(big){
    nav('advisor');
    document.getElementById('ainput').value = `I just added ${ex.name} on ${ex.date}. Can you help me plan my preparation for this?`;
  }
}
function autorev(ex){
  const isFinals = ex.type.startsWith('finals');
  const isPF = ex.type.startsWith('prefinals');
  let offsets;
  if(isFinals) offsets = [-30,-21,-14,-10,-7,-5,-3,-2,-1];
  else if(isPF) offsets = [-14,-10,-7,-5,-3,-2,-1];
  else offsets = [-7,-3,-1];
  const labels = {
    '-30':'Begin finals prep: ','-21':'3-week revision: ','-14':'2-week intensive: ',
    '-10':'10-day push: ','-7':'1-week revision: ','-5':'5-day revision: ',
    '-3':'3-day revision: ','-2':'2-day revision: ','-1':'Day-before revision: '
  };
  offsets.forEach(o => {
    const d = new Date(ex.date); d.setDate(d.getDate() + o);
    const ds = d.toISOString().split('T')[0];
    if(new Date(ds) >= new Date()){
      const label = labels[String(o)] || 'Revision: ';
      S.tasks.push({ id:'t'+Date.now()+Math.random(), name: label+ex.name, subject: ex.subject, date: ds, type:'revision', done:false });
    }
  });
  save();
}
function dexam(id){ S.exams = S.exams.filter(e => e.id !== id); save(); rexams(); }

function rexams(){
  const now = new Date(); now.setHours(0,0,0,0);
  const up = S.exams.filter(e => new Date(e.date) >= now).sort((a,b) => new Date(a.date) - new Date(b.date));
  const past = S.exams.filter(e => new Date(e.date) < now).sort((a,b) => new Date(b.date) - new Date(a.date));
  const typeLabel = {
    theory:'Theory · Internal', practical:'Practical · Internal', internal:'Internal Assessment',
    viva:'Viva', assignment:'Assignment',
    prefinals_theory:'Pre-Finals · Theory', prefinals_practical:'Pre-Finals · Practical', prefinals_viva:'Pre-Finals · Viva',
    finals_theory:'Finals · Theory', finals_practical:'Finals · Practical', finals_viva:'Finals · Viva'
  };
  const r = (arr, id) => {
    const el = document.getElementById(id);
    if(!arr.length){ el.innerHTML = '<div class="empty"><span class="empty-orn">· ❦ ·</span>None on record</div>'; return; }
    el.innerHTML = arr.map(e => {
      const dl = Math.ceil((new Date(e.date) - new Date())/864e5);
      const isFinals = e.type && e.type.startsWith('finals');
      const isPF = e.type && e.type.startsWith('prefinals');
      const klass = isFinals ? 'finals' : (isPF ? 'prefinals' : '');
      return `<div class="ecrd ${klass}">
        <div class="ebox">
          <div class="ed">${new Date(e.date).getDate()}</div>
          <div class="em">${new Date(e.date).toLocaleString('default',{month:'short'})}</div>
        </div>
        <div style="flex:1;min-width:0">
          <div class="e-name">${e.name} ${isFinals?'<span style="color:var(--accent);font-size:14px">★</span>':isPF?'<span style="color:var(--gold);font-size:14px">✦</span>':''}</div>
          <div class="e-meta">${typeLabel[e.type] || e.type}${e.notes?' · '+e.notes:''}</div>
        </div>
        <div class="e-right">
          <span class="badge b-${sc(e.subject)}">${e.subject}</span>
          ${dl>0?`<span class="e-daysleft ${isFinals && dl<=30 ? 'urgent' : isPF && dl<=14 ? 'warn' : dl<=7 ? 'urgent' : ''}">${dl} days</span>`:''}
        </div>
        <button class="icon-btn" style="color:var(--ink-4)" onclick="dexam('${e.id}')" title="Remove">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>`;
    }).join('');
  };
  r(up, 'exup'); r(past, 'expast');
}

function getExamPhase(){
  const now = new Date();
  const finals = S.exams.filter(e => e.type && e.type.startsWith('finals') && new Date(e.date) >= now)
    .sort((a,b) => new Date(a.date) - new Date(b.date));
  const pref = S.exams.filter(e => e.type && e.type.startsWith('prefinals') && new Date(e.date) >= now)
    .sort((a,b) => new Date(a.date) - new Date(b.date));
  if(finals.length){
    const dl = Math.ceil((new Date(finals[0].date) - now)/864e5);
    if(dl <= 45) return { phase:'finals', exam: finals[0], daysLeft: dl };
  }
  if(pref.length){
    const dl = Math.ceil((new Date(pref[0].date) - now)/864e5);
    if(dl <= 21) return { phase:'prefinals', exam: pref[0], daysLeft: dl };
  }
  return { phase:'normal' };
}

function toggleExamPhase(sel){
  const info = document.getElementById('exam-phase-info');
  const msg = document.getElementById('exam-phase-msg');
  const v = sel.value;
  if(v.startsWith('finals')){
    info.style.display = 'block';
    msg.textContent = '⭐ Finals exam — extended 30-day revision schedule will be created.';
  } else if(v.startsWith('prefinals')){
    info.style.display = 'block';
    msg.textContent = '✦ Pre-finals — 2-week intensive revision will be added.';
  } else {
    info.style.display = 'none';
  }
}

/* ─── AI ADVISOR ──────────────────────────────────────────────────────── */
let amode = 'chat';
const mhints = {
  chat:'Speak freely — ask for plans, explanations, or scheduling help.',
  schedule:'Describe your week & constraints — Counsel will build a schedule and add tasks.',
  explain:'Name a topic — Counsel will explain it with structure, numbers, mnemonics & clinical links.',
  feedback:'Write your answer to a question — Counsel will mark it and give the model answer.'
};
function setMode(m, el){
  amode = m;
  document.querySelectorAll('#page-advisor .pill').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('ahint').innerHTML = '<span class="serif-i" style="color:var(--gold)">❦</span> ' + mhints[m];
}
function fa(t){ document.getElementById('ainput').value = t; }
function atopic(s, t){
  nav('advisor');
  document.getElementById('ainput').value = `Explain "${t}" from ${s} — key points, clinical relevance, and what's commonly asked in NTR university exams.`;
}
function ach(s, ch){
  nav('advisor');
  document.getElementById('ainput').value = `What are the most important topics in "${ch}" (${s}) for NTR university 1st year theory and viva exams?`;
}
function rch(s, ch){
  nav('advisor');
  document.getElementById('ainput').value = `Give me a concise revision summary of "${ch}" from ${s}. Key facts, numbers, mnemonics, and 3–4 likely exam questions.`;
}
function pfc(s, t){
  nav('flashcards');
  document.getElementById('fgs').value = s;
  document.getElementById('fgt').value = t;
  fctab('gen', document.querySelectorAll('#page-flashcards .pill')[2]);
}

function bsys(){
  const sa = sts('anatomy'), sp = sts('physiology'), sb = sts('biochemistry');
  const upex = S.exams.filter(e => new Date(e.date) >= new Date())
    .sort((a,b) => new Date(a.date) - new Date(b.date)).slice(0,5)
    .map(e => `${e.name} on ${e.date} (${e.type})`).join('; ') || 'None';
  const tod = new Date().toISOString().split('T')[0];
  const todtasks = S.tasks.filter(t => t.date === tod).map(t => `${t.name} [${t.done?'done':'pending'}]`).join(', ') || 'None';
  const overdue = S.tasks.filter(t => t.type === 'revision' && !t.done && new Date(t.date) < new Date()).length;
  const minst = {
    chat: 'Be a warm, practical study counsel. Help with planning, motivation, explanations, and exam strategy.',
    schedule: `Generate a study schedule. After your advice, output a task JSON block like this:
TASKS_JSON:[{"name":"task name","subject":"anatomy|physiology|biochemistry","date":"YYYY-MM-DD","type":"study|revision|practice|practical"}]
The app will auto-import these. Today is ${tod}.`,
    explain: 'Give a thorough, structured explanation. Include key values/numbers, mechanisms, mnemonics, and clinical significance. Reference specific chapters from Vishram Singh, GK Pal, or Vasudevan.',
    feedback: 'The student is writing an answer for marking. Identify what is correct, missing, and wrong. Give marks /10 with justification, then provide the ideal model answer.'
  };
  const phase = getExamPhase();
  const phaseLine = phase.phase==='finals'
    ? 'FINALS MODE — '+phase.exam.name+' in '+phase.daysLeft+' days. This is the most important exam.'
    : phase.phase==='prefinals'
      ? 'PRE-FINALS MODE — '+phase.exam.name+' in '+phase.daysLeft+' days.'
      : 'Normal study phase.';
  return `You are Codex, a personal MBBS study counsel for Srija, an Indian MBBS 1st year student at Medicity Medical College, Hyderabad, affiliated to Dr NTR University of Health Sciences, Vijayawada. You are warm, knowledgeable, and direct. You always address her by name.

SRIJA'S TEXTBOOKS:
- Anatomy: Vishram Singh's Textbook of Anatomy (Vols 1-3). Gray's Anatomy for reference.
- Physiology: GK Pal's Textbook of Practical Physiology + Guyton & Hall's Medical Physiology
- Biochemistry: DM Vasudevan's Textbook of Biochemistry

SRIJA'S CURRENT PROGRESS:
- Anatomy: ${sa.pct}% (${sa.d}/${sa.t} topics)
- Physiology: ${sp.pct}% (${sp.d}/${sp.t} topics)
- Biochemistry: ${sb.pct}% (${sb.d}/${sb.t} topics)
- Upcoming exams: ${upex}
- Today's tasks: ${todtasks}
- Overdue revisions: ${overdue}
- Current exam phase: ${phaseLine}

NTR UNIVERSITY EXAM PATTERN (1st Year MBBS):
Theory papers (3 hrs each):
- 2 LAQs × 10 marks = 20
- 10 SAQs × 5 marks = 50
- 10 MCQs × 1 mark = 10
- 20 marks internal assessment
- Pass: ≥50% in theory AND practical separately. 75% attendance mandatory.

Practical/Viva: Anatomy spotting, histology slides, osteology, embryology, surface anatomy. Physiology haematology, amphibian experiments, spirometry. Biochemistry urine analysis, qualitative tests. Applied/clinical questions in viva.

HIGH-YIELD TOPICS:
ANATOMY: Brachial plexus (formation, branches, injuries) — every year. Inguinal canal. Hip joint. Carpal tunnel. Heart. Cranial nerves. Histology (liver, kidney, testis, ovary, lung, skin, spleen). Embryology (placenta, neural tube defects).
PHYSIOLOGY: ECG. Cardiac cycle. Hb-O2 curve. GFR. Counter-current mechanism. Action potential. Lung volumes (memorise normals). Control of respiration. Blood groups. Thyroid. Insulin/diabetes.
BIOCHEMISTRY: Glycolysis (all 10 steps) — every year. TCA. ETC. β-oxidation. Urea cycle. HMP shunt + G6PD. Enzyme kinetics. Cholesterol + lipoproteins. Porphyrin + jaundice. Vitamins. LFTs/RFTs. Diabetes biochemistry.

STUDY METHODS BY TOPIC TYPE:
- Spatial anatomy (brachial plexus, cranial nerves, heart, inguinal canal) → DRAW from memory, check, redraw.
- Biochem pathways (glycolysis, TCA, urea, β-ox) → draw the pathway, label every enzyme cold.
- Physio mechanisms (cardiac cycle, action potential, GFR, hormone loops) → understand the WHY first, then memorise. Explain it aloud as if teaching.
- Normal values, enzyme names, vitamin deficiencies, cranial nerve foramina → flashcards + spaced repetition.
- Histology → look at slide images, sketch distinguishing features.
- Lists (carpal bones, nerve branches, coagulation) → mnemonics, ideally personal ones.
- Clinical correlations (diabetes biochem, LFTs in liver disease) → story/reasoning, cause → mechanism → effect.

EXAM WRITING:
- LAQs: Definition, Classification, Mechanism, Clinical Significance, Diagram. Rough diagrams still add marks.
- SAQs: 3-4 focused points + small labelled diagram.
- MCQs: Know normal values cold.
- Viva: confident, direct, link findings to clinical.
- Time: LAQs first (~15 min each), then SAQs (~4 min), MCQs last.

PERSONALITY:
- Warm but academic. Like a senior who genuinely cares.
- Always call her Srija.
- When she's overwhelmed: validate FIRST, advise second.
- Be specific about study methods — never just "make flashcards", say WHAT to put on them.
- Light warmth welcome; no fake cheer.

CURRENT MODE: ${minst[amode]}`;
}

async function sendAdv(){
  const inp = document.getElementById('ainput');
  const msg = inp.value.trim();
  if(!msg) return;
  inp.value = '';
  const subj = document.getElementById('asubj').value;
  const cm = subj !== 'all' ? `[Subject focus: ${subj}] ${msg}` : msg;
  amsg('achat', msg, 'user');
  S.advHist.push({ role:'user', content: cm });
  if(S.advHist.length > 20) S.advHist = S.advHist.slice(-20);
  const txt = await callai(bsys(), S.advHist, 'achat');
  if(txt){
    S.advHist.push({ role:'assistant', content: txt });
    save();
    const m = txt.match(/TASKS_JSON:\s*(\[[\s\S]*?\])/);
    if(m){
      try {
        const ts = JSON.parse(m[1]);
        ts.forEach(t => S.tasks.push({ id:'t'+Date.now()+Math.random(), done:false, ...t }));
        save();
        amsg('achat', '✓ Tasks added to your docket.', 'ai');
        if(cst) rsched(cst);
      } catch(e){}
    }
  }
}

async function qa(msg){
  amsg('dchat', msg, 'user');
  const sys = `You are Codex, a concise study counsel for Srija, MBBS 1st year at Medicity Medical College, Hyderabad (NTR University). Be brief and practical. Books: Vishram Singh, GK Pal+Guyton, Vasudevan. NTR pattern: LAQs (10m), SAQs (5m), MCQs (1m). Progress — A:${sts('anatomy').pct}%, P:${sts('physiology').pct}%, B:${sts('biochemistry').pct}%. Today: ${new Date().toISOString().split('T')[0]}.`;
  await callai(sys, [{ role:'user', content: msg }], 'dchat');
}

function sendDash(){
  const inp = document.getElementById('dchat-input');
  const msg = inp.value.trim();
  if(!msg) return;
  inp.value = '';
  qa(msg);
}

async function callai(sys, msgs, chatId){
  const key = gk();
  if(!key){ amsg(chatId, '⚠ No API key. Go to Settings to add your Anthropic API key.', 'ai'); return null; }
  const chat = document.getElementById(chatId);
  const thk = document.createElement('div');
  thk.className = 'thinking';
  thk.innerHTML = '<span></span><span></span><span></span>';
  chat.appendChild(thk);
  chat.scrollTop = chat.scrollHeight;
  try {
    const r = await fetch(API, {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        'x-api-key': key,
        'anthropic-version':'2023-06-01',
        'anthropic-dangerous-direct-browser-access':'true'
      },
      body: JSON.stringify({
        model:'claude-sonnet-4-6',
        max_tokens: 1024,
        system: sys,
        messages: msgs
      })
    });
    const d = await r.json();
    thk.remove();
    if(d.error){ amsg(chatId, '⚠ Error: '+d.error.message+' ('+d.error.type+')', 'ai'); return null; }
    const txt = d.content?.map(c => c.text || '').join('') || 'No response.';
    amsg(chatId, txt.replace(/TASKS_JSON:\s*\[[\s\S]*?\]/, '').trim(), 'ai');
    return txt;
  } catch(e){
    thk.remove();
    amsg(chatId, 'Network error. Check your connection.', 'ai');
    return null;
  }
}

function amsg(chatId, text, role){
  const chat = document.getElementById(chatId);
  const div = document.createElement('div');
  div.className = 'msg ' + (role==='user'?'mu':'ma');
  if(role === 'ai'){
    const l = document.createElement('div');
    l.className = 'mlbl';
    l.textContent = 'Codex Counsel';
    div.appendChild(l);
  }
  const c = document.createElement('div');
  c.textContent = text;
  div.appendChild(c);
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

/* ─── FLASHCARDS ──────────────────────────────────────────────────────── */
let fci = 0;
function fctab(tab, el){
  ['fcbrowse','fcstudy','fcgen'].forEach(t => { document.getElementById(t).style.display = 'none'; });
  document.getElementById('fc'+tab).style.display = 'block';
  document.querySelectorAll('#page-flashcards .pill').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
  if(tab === 'study') lfc();
  if(tab === 'browse') rfcs();
}
function rfcs(){
  const el = document.getElementById('fclist');
  if(!S.flashcards.length){
    el.innerHTML = '<div class="empty" style="grid-column:1/-1"><span class="empty-orn">· ❦ ·</span>No cards yet. Generate some with AI, or write your own.</div>';
    return;
  }
  el.innerHTML = S.flashcards.map((f, i) => `<div class="fc-cardlet">
    <button class="fc-del" onclick="dfc(${i})" title="Remove">✕</button>
    <span class="badge b-${sc(f.subject)}" style="margin-bottom:10px">${f.subject}</span>
    <div class="fc-q">${f.q}</div>
    <div class="fc-a">${f.a}</div>
  </div>`).join('');
}
function addFC(){
  const q = document.getElementById('fcq').value.trim();
  const a = document.getElementById('fca').value.trim();
  if(!q || !a){ alert('Please fill both fields'); return; }
  S.flashcards.push({ subject: document.getElementById('fcs').value, q, a });
  save(); closeM('mfc');
  document.getElementById('fcq').value = '';
  document.getElementById('fca').value = '';
  rfcs();
}
function dfc(i){ S.flashcards.splice(i, 1); save(); rfcs(); }
function lfc(){
  if(!S.flashcards.length){
    document.getElementById('fcqt').textContent = 'No cards yet.';
    document.getElementById('fcat').textContent = '';
    document.getElementById('fcidx').textContent = '';
    return;
  }
  const f = S.flashcards[fci % S.flashcards.length];
  document.getElementById('fcsw').classList.remove('flipped');
  document.getElementById('fcqt').textContent = f.q;
  document.getElementById('fcat').textContent = f.a;
  document.getElementById('fcidx').textContent = 'Card ' + (fci % S.flashcards.length + 1) + ' of ' + S.flashcards.length;
}
function flipFC(){ document.getElementById('fcsw').classList.toggle('flipped'); }
function rateFC(){ fci++; lfc(); }
async function genFCs(){
  const s = document.getElementById('fgs').value;
  const t = document.getElementById('fgt').value.trim();
  const c = document.getElementById('fgc').value;
  if(!t){ alert('Enter a topic'); return; }
  const key = gk();
  if(!key){ alert('Add API key in Settings first.'); return; }
  const st = document.getElementById('fgst');
  st.textContent = 'Generating...';
  const bk = { anatomy:'Vishram Singh', physiology:'GK Pal / Guyton', biochemistry:'Vasudevan' };
  try {
    const r = await fetch(API, {
      method:'POST',
      headers:{'Content-Type':'application/json','x-api-key':key,'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'},
      body: JSON.stringify({
        model:'claude-sonnet-4-6',
        max_tokens: 1024,
        messages:[{ role:'user', content:`Generate ${c} MBBS flashcards for ${s}, topic: "${t}". Reference ${bk[s]}. Focus on NTR university exam content. Return ONLY a JSON array, no markdown: [{"q":"question","a":"concise answer"}]` }]
      })
    });
    const d = await r.json();
    const txt = d.content?.map(x => x.text || '').join('') || '';
    const m = txt.match(/\[[\s\S]*\]/);
    if(!m) throw new Error('No JSON');
    const cards = JSON.parse(m[0]);
    cards.forEach(x => S.flashcards.push({ subject: s, q: x.q, a: x.a }));
    save();
    st.textContent = '✓ Added ' + cards.length + ' cards';
    rfcs();
  } catch(e){
    st.textContent = 'Error. Try again.';
  }
}

/* ─── SETTINGS ────────────────────────────────────────────────────────── */
function saveKey(){
  const k = document.getElementById('kfield').value.trim();
  if(!k){ alert('Enter key'); return; }
  localStorage.setItem('mt_key', k);
  document.getElementById('kst').textContent = '✓ Key saved!';
}
function clearKey(){
  localStorage.removeItem('mt_key');
  document.getElementById('kfield').value = '';
  document.getElementById('kst').textContent = 'Key cleared.';
}

/* ─── MISSED DAY ──────────────────────────────────────────────────────── */
async function handleMissed(){
  const date = document.getElementById('msd').value;
  const reason = document.getElementById('msr').value;
  if(!date){ alert('Select date'); return; }
  const tom = new Date(); tom.setDate(tom.getDate() + 1);
  const ts = tom.toISOString().split('T')[0];
  let cnt = 0;
  S.tasks.forEach(t => { if(t.date === date && !t.done){ t.date = ts; cnt++; } });
  save(); closeM('mm'); rsched(cst); nav('advisor');
  const note = document.getElementById('msn').value;
  document.getElementById('msn').value = '';
  document.getElementById('ainput').value = `I missed my study on ${date} because: ${reason}. ${note||''} ${cnt} tasks have been rescheduled to tomorrow. Can you help me plan how to catch up without burning out?`;
  sendAdv();
}

/* ─── UTILS ───────────────────────────────────────────────────────────── */
function sc(s){
  return { anatomy:'anatomy', physiology:'physiology', biochemistry:'biochemistry', general:'general', all:'all' }[s] || 'general';
}
function fd(d){ return new Date(d).toLocaleDateString('en-IN', { day:'numeric', month:'short' }); }
function fdf(d){
  const dt = new Date(d), t = new Date(); t.setHours(0,0,0,0);
  const d2 = new Date(dt); d2.setHours(0,0,0,0);
  if(d2.getTime() === t.getTime()) return 'Today';
  const tm = new Date(t); tm.setDate(t.getDate() + 1);
  if(d2.getTime() === tm.getTime()) return 'Tomorrow';
  return dt.toLocaleDateString('en-IN', { weekday:'long' });
}
function openM(id){
  document.getElementById(id).classList.add('open');
  const df = { 'mt':'td', 'me':'ed', 'mm':'msd' };
  if(df[id]){
    const el = document.getElementById(df[id]);
    if(el && !el.value) el.value = new Date().toISOString().split('T')[0];
  }
}
function closeM(id){ document.getElementById(id).classList.remove('open'); }

/* ─── FLOATING CHAT ───────────────────────────────────────────────────── */
let fcHistory = [];
function toggleFC(){
  const panel = document.getElementById('fchat-panel');
  panel.classList.toggle('open');
  document.getElementById('fchat-btn').classList.remove('has-unread');
  if(panel.classList.contains('open')){
    document.getElementById('fchat-input').focus();
  }
}
function fcs(txt){
  document.getElementById('fc-starters').style.display = 'none';
  document.getElementById('fchat-input').value = txt;
  sendFC();
}
function fcAmsg(text, role){
  const msgs = document.getElementById('fchat-msgs');
  const div = document.createElement('div');
  div.className = 'fcmsg ' + (role==='user'?'fcmu':'fcma');
  div.textContent = text;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}
function fcThinking(){
  const msgs = document.getElementById('fchat-msgs');
  const div = document.createElement('div');
  div.className = 'thinking';
  div.id = 'fc-think';
  div.innerHTML = '<span></span><span></span><span></span>';
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
  return div;
}
function buildFCSystem(){
  const sa = sts('anatomy'), sp = sts('physiology'), sb = sts('biochemistry');
  const upex = S.exams.filter(e => new Date(e.date) >= new Date())
    .sort((a,b) => new Date(a.date) - new Date(b.date)).slice(0,3)
    .map(e => e.name + ' on ' + e.date).join(', ') || 'none';
  const tod = new Date().toISOString().split('T')[0];
  const todtasks = S.tasks.filter(t => t.date === tod && !t.done).map(t => t.name).join(', ') || 'none';
  return `You are Codex, a warm and supportive study companion for Srija, MBBS 1st year at Medicity Medical College, Hyderabad (NTR University).

Books: Vishram Singh Anatomy, GK Pal+Guyton Physiology, Vasudevan Biochemistry.
Progress: Anatomy ${sa.pct}% · Physiology ${sp.pct}% · Biochemistry ${sb.pct}%
Upcoming exams: ${upex}
Today's pending tasks: ${todtasks}
Today: ${new Date().toLocaleDateString('en-IN', {weekday:'long', day:'numeric', month:'long', year:'numeric'})}

NTR exams: 2 LAQs (10m) + 10 SAQs (5m) + 10 MCQs (1m) + 20m internals. Practicals + viva. Pass = 50% theory AND practical separately.

High-yield: Brachial plexus, inguinal canal, ECG, cardiac cycle, glycolysis, urea cycle, TCA, GFR, Hb-O2 curve, enzyme kinetics, vitamins.

Personality:
- Warm, like a knowledgeable senior. Always call her Srija.
- When she's struggling: acknowledge feelings FIRST, then advise.
- Short conversational replies for casual messages — no essays unless asked.
- Light warmth, never fake cheer.
- If subject question: clear answer + textbook chapter + flag if common exam question.

Study methods (tailor to topic):
- Spatial anatomy → DRAW from memory.
- Biochem pathways → draw pathway, label enzymes.
- Physio mechanisms → understand WHY first, teach it aloud.
- Normal values / lists → flashcards + spaced repetition.
- Histology → look at slide images, sketch features.
- Clinical correlations → story/reasoning.`;
}

async function sendFC(){
  const inp = document.getElementById('fchat-input');
  const msg = inp.value.trim();
  if(!msg) return;
  inp.value = '';
  document.getElementById('fc-starters').style.display = 'none';
  fcAmsg(msg, 'user');
  fcHistory.push({ role:'user', content: msg });
  if(fcHistory.length > 16) fcHistory = fcHistory.slice(-16);
  const key = gk();
  if(!key){
    fcAmsg('Add an API key in Settings first, Srija — then we can really talk.', 'ai');
    return;
  }
  const thk = fcThinking();
  try {
    const r = await fetch(API, {
      method:'POST',
      headers:{'Content-Type':'application/json','x-api-key':key,'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'},
      body: JSON.stringify({
        model:'claude-sonnet-4-6',
        max_tokens: 600,
        system: buildFCSystem(),
        messages: fcHistory
      })
    });
    const d = await r.json();
    thk.remove();
    if(d.error){ fcAmsg('⚠ Error: '+d.error.message+' ('+d.error.type+')', 'ai'); return; }
    const txt = d.content?.map(c => c.text || '').join('') || '...';
    fcAmsg(txt, 'ai');
    fcHistory.push({ role:'assistant', content: txt });
  } catch(e){
    thk.remove();
    fcAmsg('Network hiccup. Try again?', 'ai');
  }
}

/* ─── STUDY TIMER ─────────────────────────────────────────────────────── */
let timerState = {
  total: 25*60, remaining: 25*60,
  running: false, paused: false,
  interval: null, subject:'anatomy', sessions: []
};

function toggleTimer(){
  const p = document.getElementById('timer-panel');
  p.classList.toggle('open');
  if(p.classList.contains('open')){
    renderSessionLog();
    renderDistractionLog();
  }
}

function setPreset(mins, el){
  if(timerState.running) return;
  document.querySelectorAll('.tpreset').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
  const cr = document.getElementById('timer-custom-row');
  if(mins === 0){ cr.style.display = 'flex'; return; }
  cr.style.display = 'none';
  timerState.total = mins * 60;
  timerState.remaining = mins * 60;
  updateTimerDisplay();
}

function setCustom(){
  const m = parseInt(document.getElementById('timer-custom-min').value) || 25;
  timerState.total = m * 60;
  timerState.remaining = m * 60;
  updateTimerDisplay();
}

function startTimer(){
  timerState.subject = document.getElementById('timer-subj').value;
  timerState.running = true; timerState.paused = false;
  document.getElementById('tbtn-start').style.display = 'none';
  document.getElementById('tbtn-pause').style.display = 'block';
  const sb = document.getElementById('tbtn-stop');
  if(sb) sb.style.display = 'block';
  document.getElementById('timer-btn').className = 'running';
  document.querySelectorAll('.tpreset').forEach(p => p.style.pointerEvents = 'none');
  document.getElementById('timer-custom-row').style.pointerEvents = 'none';
  timerState.interval = setInterval(tickTimer, 1000);
  updateTimerDisplay();
  setTimeout(() => { if(timerState.running) enterFocusMode(); }, 300);
}

function pauseTimer(){
  if(timerState.paused){
    timerState.paused = false;
    document.getElementById('tbtn-pause').textContent = 'Pause';
    document.getElementById('timer-btn').className = 'running';
    timerState.interval = setInterval(tickTimer, 1000);
  } else {
    timerState.paused = true;
    clearInterval(timerState.interval);
    document.getElementById('tbtn-pause').textContent = 'Resume';
    document.getElementById('timer-btn').className = 'paused';
    document.getElementById('timer-label').textContent = 'Paused';
  }
}

function resetTimer(){
  clearInterval(timerState.interval);
  timerState.running = false; timerState.paused = false;
  timerState.remaining = timerState.total;
  document.getElementById('tbtn-start').style.display = 'block';
  document.getElementById('tbtn-pause').style.display = 'none';
  document.getElementById('tbtn-pause').textContent = 'Pause';
  const sb = document.getElementById('tbtn-stop');
  if(sb) sb.style.display = 'none';
  document.getElementById('timer-btn').className = '';
  document.getElementById('timer-clock').className = '';
  const fill = document.getElementById('timer-prog-fill');
  fill.className = '';
  fill.style.width = '100%';
  document.querySelectorAll('.tpreset').forEach(p => p.style.pointerEvents = '');
  document.getElementById('timer-custom-row').style.pointerEvents = '';
  document.getElementById('timer-label').textContent = 'Ready to focus';
  updateTimerDisplay();
  if(focusState.active) exitFocus();
}

function tickTimer(){
  timerState.remaining--;
  if(timerState.remaining <= 0){
    timerState.remaining = 0;
    timerDone();
    return;
  }
  updateTimerDisplay();
  if(focusState.active) updateFocusClock();
}

function updateTimerDisplay(){
  const m = Math.floor(timerState.remaining / 60);
  const s = timerState.remaining % 60;
  const clock = document.getElementById('timer-clock');
  if(!clock) return;
  clock.textContent = String(m).padStart(2,'0') + ':' + String(s).padStart(2,'0');
  const pct = timerState.total > 0 ? (timerState.remaining/timerState.total)*100 : 100;
  const fill = document.getElementById('timer-prog-fill');
  if(fill) fill.style.width = pct + '%';
  const lbl = document.getElementById('timer-label');
  if(timerState.running && !timerState.paused && lbl){
    const elapsed = Math.floor((timerState.total - timerState.remaining)/60);
    lbl.textContent = elapsed > 0 ? elapsed + ' min into session' : 'Session begun';
    if(pct <= 20){
      clock.className = 'warning';
      if(fill) fill.className = 'warning';
    } else {
      clock.className = 'running';
      if(fill) fill.className = '';
    }
  }
}

function timerDone(){
  clearInterval(timerState.interval);
  timerState.running = false;
  const mins = Math.round(timerState.total / 60);
  const sn = { anatomy:'Anatomy', physiology:'Physiology', biochemistry:'Biochemistry', general:'your session' };
  const clock = document.getElementById('timer-clock');
  if(clock){ clock.className = 'done'; clock.textContent = 'Done!'; }
  const fill = document.getElementById('timer-prog-fill');
  if(fill){ fill.className = 'done'; fill.style.width = '0%'; }
  const lbl = document.getElementById('timer-label');
  if(lbl) lbl.textContent = 'Session complete';
  document.getElementById('tbtn-start').style.display = 'block';
  document.getElementById('tbtn-pause').style.display = 'none';
  document.getElementById('tbtn-pause').textContent = 'Pause';
  const sb = document.getElementById('tbtn-stop');
  if(sb) sb.style.display = 'none';
  document.getElementById('timer-btn').className = '';
  document.querySelectorAll('.tpreset').forEach(p => p.style.pointerEvents = '');
  document.getElementById('timer-custom-row').style.pointerEvents = '';
  const now = new Date();
  if(!S.timerSessions) S.timerSessions = [];
  S.timerSessions.push({
    subject: timerState.subject, mins,
    time: now.toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit' }),
    date: now.toISOString().split('T')[0]
  });
  ms(); save(); renderSessionLog();
  if(focusState.active){
    const ring = document.getElementById('focus-ring-fill');
    if(ring){ ring.style.strokeDashoffset = '0'; ring.style.stroke = 'var(--success)'; }
    const fclk = document.getElementById('focus-clock-svg');
    if(fclk){ fclk.textContent = 'Done'; fclk.setAttribute('fill', 'currentColor'); }
    setTimeout(() => exitFocus(), 2500);
  }
  if(typeof fcAmsg === 'function'){
    const msgs = [
      `Beautifully done, Srija. ${mins} minutes of ${sn[timerState.subject]} — take a five-minute breath before the next round.`,
      `That's ${mins} minutes of ${sn[timerState.subject]} in the bank. Momentum is on your side. Rest, then back to it.`,
      `Session complete. ${mins} minutes well spent on ${sn[timerState.subject]}. How did it feel?`
    ];
    fcAmsg(msgs[Math.floor(Math.random() * msgs.length)], 'ai');
    if(!document.getElementById('fchat-panel').classList.contains('open')){
      document.getElementById('fchat-btn').classList.add('has-unread');
    }
  }
  if('Notification' in window && Notification.permission === 'granted'){
    new Notification('Session complete', { body: mins + ' minutes of ' + timerState.subject + ' done.' });
  }
}

function renderSessionLog(){
  if(!S.timerSessions || !S.timerSessions.length) return;
  const today = new Date().toISOString().split('T')[0];
  const tod = S.timerSessions.filter(s => s.date === today);
  if(!tod.length) return;
  document.getElementById('timer-session-log').style.display = 'block';
  const totalMins = tod.reduce((a, s) => a + s.mins, 0);
  document.getElementById('tlog-list').innerHTML = `<div style="font-size:12px;color:var(--ink-2);margin-bottom:8px"><span class="serif-i">Total today:</span> <strong class="mono">${totalMins} min</strong></div>`
    + tod.slice(-5).reverse().map(s => `<div class="slog-item"><span>${s.time} · ${s.mins}m</span><span class="slog-subj badge b-${sc(s.subject)}">${s.subject}</span></div>`).join('');
}

/* ─── DISTRACTION LOGGER ──────────────────────────────────────────────── */
let selectedReason = '';
let distractStartTime = 0;

function openDistract(){
  if(!timerState.running && !timerState.paused) return;
  if(!timerState.paused){ clearInterval(timerState.interval); }
  distractStartTime = timerState.total - timerState.remaining;
  selectedReason = '';
  document.querySelectorAll('.dreason button').forEach(b => b.classList.remove('sel'));
  document.getElementById('dnote').value = '';
  document.getElementById('distract-modal').classList.add('open');
}
function closeDistract(){
  document.getElementById('distract-modal').classList.remove('open');
  if(timerState.running && !timerState.paused){
    timerState.interval = setInterval(tickTimer, 1000);
  }
}
function selReason(btn){
  document.querySelectorAll('.dreason button').forEach(b => b.classList.remove('sel'));
  btn.classList.add('sel');
  selectedReason = btn.textContent.replace(/^[\u{1F000}-\u{1FFFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]\s*/u, '').trim();
}
function logDistraction(){
  const note = document.getElementById('dnote').value.trim();
  const elapsed = Math.floor(distractStartTime / 60);
  const reason = selectedReason || 'Unspecified';
  const entry = {
    time: new Date().toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit' }),
    reason, note, minutesIn: elapsed,
    subject: timerState.subject,
    date: new Date().toISOString().split('T')[0]
  };
  if(!S.distractions) S.distractions = [];
  S.distractions.push(entry); save();
  document.getElementById('distract-modal').classList.remove('open');
  resetTimer();
  renderDistractionLog();
  if(typeof fcAmsg === 'function'){
    const sn = { anatomy:'Anatomy', physiology:'Physiology', biochemistry:'Biochemistry', general:'your session' };
    const empathy = {
      'Phone distraction': "The phone is a portal — try parking it in another room next time. You'll be amazed what comes back.",
      'Felt sleepy': "Sleepy at the desk is real, especially after meals. A ten-minute power nap or splash of water can reset you.",
      'Lost concentration': "Lost in thought? Happens to the best of us. The two-minute rule: just start reading for two minutes — momentum usually kicks in.",
      'Family interruption': "Family interruptions are hard to gate. Try a signal — closed door, headphones — they'll learn.",
      'Topic too difficult': "If the topic is hard, that's information. Want me to break it down differently?",
      'Mental fatigue': "Mental fatigue is real, Srija. Your brain consolidates while you rest. Take a proper break.",
      'Got distracted online': "The internet is built to pull you in. Try full-screen or a site blocker next time.",
      'Mind wandering': "Mind wandering is your brain processing. A short walk can reset focus."
    };
    const msg = empathy[reason] || `You logged a distraction after ${elapsed} min of ${sn[timerState.subject || entry.subject]}. Honest self-awareness is how you improve. Ready to try again?`;
    fcAmsg(msg, 'ai');
    if(!document.getElementById('fchat-panel').classList.contains('open')){
      document.getElementById('fchat-btn').classList.add('has-unread');
    }
  }
}
function renderDistractionLog(){
  if(!S.distractions) return;
  const today = new Date().toISOString().split('T')[0];
  const tod = S.distractions.filter(d => d.date === today);
  if(!tod.length) return;
  document.getElementById('timer-distract-log').style.display = 'block';
  document.getElementById('dlog-list').innerHTML = tod.slice(-5).reverse().map(d => `
    <div class="dlog-entry">
      <span>${d.time} · ${d.minutesIn}min in · <span style="color:var(--ink-2)">${d.reason}</span>${d.note?' · '+d.note:''}</span>
    </div>
  `).join('');
  if(tod.length >= 2){
    const avg = Math.round(tod.reduce((a, d) => a + d.minutesIn, 0) / tod.length);
    document.getElementById('dlog-list').insertAdjacentHTML('afterend',
      `<div class="dstat">You tend to lose focus around ${avg} min into sessions today.</div>`
    );
  }
}

/* ─── FOCUS MODE ──────────────────────────────────────────────────────── */
let focusState = { active:false, lastNudge: 0, nudgeTimeout: null };

const FOCUS_TIPS = {
  anatomy: [
    'Draw before you read. Spatial topics live in your hand.',
    'Pick one chapter. Close everything else. Trust the small scope.',
    'After this session, sketch what you remember on blank paper — even rough.',
    'Vishram Singh has the best line diagrams for a reason. Use them.'
  ],
  physiology: [
    'Ask "what happens if this step fails?" — that\'s where understanding lives.',
    'Draw the cardiac cycle freehand at the end. Even if it\'s ugly.',
    'GK Pal\'s practical chapters earn their place during the viva.',
    'Read it once, then close the book and explain it aloud as if teaching.'
  ],
  biochemistry: [
    'Pathways become invisible only after you draw them five times.',
    'Vasudevan\'s flowcharts — copy them by hand, not by photograph.',
    'For every enzyme: substrate, product, regulation. That\'s the rhythm.',
    'Know the rate-limiting step of every pathway. That\'s the MCQ.'
  ],
  general: [
    'A single focused session beats two distracted ones.',
    'Phone in another room. The veena is not online either.',
    'You\'re building a doctor, one chapter at a time.',
    'Be where your feet are. The next twenty-five minutes are yours.'
  ]
};

function enterFocusMode(){
  focusState.active = true;
  document.body.classList.add('focus-active');
  const ov = document.getElementById('focus-overlay');
  ov.classList.add('active');
  const sn = { anatomy:'Anatomy', physiology:'Physiology', biochemistry:'Biochemistry', general:'Mixed Study' };
  document.getElementById('focus-subject-badge').textContent = sn[timerState.subject] + ' · Focus Session';
  const tips = FOCUS_TIPS[timerState.subject] || FOCUS_TIPS.general;
  document.getElementById('focus-tip').textContent = tips[Math.floor(Math.random() * tips.length)];
  document.getElementById('focus-topic').textContent = focusTopic();
  updateFocusClock();
  scheduleNudge();
}
function focusTopic(){
  const tod = new Date().toISOString().split('T')[0];
  const t = S.tasks.find(x => x.date === tod && !x.done && x.subject === timerState.subject);
  if(t) return '"' + t.name + '"';
  return 'Whatever you choose to give your attention to.';
}
function updateFocusClock(){
  const m = Math.floor(timerState.remaining / 60);
  const s = timerState.remaining % 60;
  const txt = String(m).padStart(2,'0') + ':' + String(s).padStart(2,'0');
  const clk = document.getElementById('focus-clock-svg');
  if(clk) clk.textContent = txt;
  const ring = document.getElementById('focus-ring-fill');
  if(ring){
    const c = 2 * Math.PI * 88;
    const off = c * (1 - timerState.remaining/timerState.total);
    ring.style.strokeDashoffset = off;
    if(timerState.remaining/timerState.total <= 0.2) ring.style.stroke = 'var(--warn)';
    else ring.style.stroke = 'var(--teal)';
  }
}
function scheduleNudge(){
  clearTimeout(focusState.nudgeTimeout);
  if(!focusState.active) return;
  focusState.nudgeTimeout = setTimeout(() => {
    if(!focusState.active || timerState.paused) return;
    const messages = [
      'Still with it, Srija? 🌿',
      'Keep going. You\'re doing the work.',
      'Halfway through this session. Stay with it.',
      'A doctor in training. Right now.',
      'One more focused stretch.'
    ];
    document.getElementById('focus-nudge-msg').textContent = messages[Math.floor(Math.random() * messages.length)];
    document.getElementById('focus-nudge').classList.add('show');
    setTimeout(() => document.getElementById('focus-nudge').classList.remove('show'), 5000);
    scheduleNudge();
  }, 8 * 60 * 1000);
}
function dismissNudge(){
  document.getElementById('focus-nudge').classList.remove('show');
}
function focusPause(){
  pauseTimer();
  document.getElementById('fbtn-pause').textContent = timerState.paused ? 'Resume' : 'Pause';
}
function exitFocus(){
  focusState.active = false;
  clearTimeout(focusState.nudgeTimeout);
  document.body.classList.remove('focus-active');
  document.getElementById('focus-overlay').classList.remove('active');
  document.getElementById('focus-nudge').classList.remove('show');
  document.getElementById('focus-checkin').classList.remove('show');
}
function checkinResponse(state){
  document.getElementById('focus-checkin').classList.remove('show');
  if(state === 'lost'){ openDistract(); }
}

/* ─── PERSONALIZATION / WELCOME ───────────────────────────────────────── */
const QUOTES = [
  "The body is the most complex machine. You're learning to listen to it.",
  "Every topic ticked off is a small candle lit toward becoming the doctor you want to be.",
  "Gray, Guyton, Vasudevan — they're old friends now, even when they bite.",
  "Medicine is hard. So are you. Both can be true.",
  "Small consistent days beat one heroic night, every time.",
  "The patients you haven't met yet are counting on the hour you give now.",
  "Progress before perfection. One chapter. Then the next.",
  "Even the brachial plexus surrenders, eventually.",
  "Overwhelm is a sign you care. Don't take it as evidence you can't.",
  "A doctor and a musician practise the same way — slowly, then with grace.",
  "What you study tonight, you'll remember at someone's bedside one day.",
  "Curiosity, not pressure, is the better engine. Use it where you can."
];

function initWelcome(){
  const h = new Date().getHours();
  const greeting = h<12 ? 'Good morning' : h<17 ? 'Good afternoon' : h<21 ? 'Good evening' : 'Studying late';
  const wel = document.getElementById('wgreeting');
  if(wel){
    wel.innerHTML = greeting + ', <span class="firstn">Srija</span>';
  }
  const qel = document.getElementById('wquote');
  if(qel) qel.textContent = QUOTES[new Date().getDate() % QUOTES.length];
  const now = new Date();
  const dnum = document.getElementById('today-num');
  if(dnum) dnum.textContent = now.getDate();
  const dmonth = document.getElementById('today-month');
  if(dmonth) dmonth.textContent = now.toLocaleDateString('en-IN', { month:'short' });
  const dweek = document.getElementById('today-week');
  if(dweek) dweek.textContent = now.toLocaleDateString('en-IN', { weekday:'long' });

  const phase = getExamPhase();
  const fb = document.getElementById('finals-banner');
  const pfb = document.getElementById('prefinals-banner');
  if(fb) fb.style.display = 'none';
  if(pfb) pfb.style.display = 'none';
  if(phase.phase === 'finals' && fb){
    fb.style.display = 'flex';
    fb.innerHTML = '<span style="font-family:var(--serif);font-size:18px">★</span><div><strong>Finals in '+phase.daysLeft+' days</strong> — '+phase.exam.name+'</div><button class="btn btn-p btn-sm" style="margin-left:auto" onclick="nav(\'advisor\');document.getElementById(\'ainput\').value=\'I have finals in '+phase.daysLeft+' days. Give me an urgent revision plan.\';sendAdv()">Get prep plan →</button>';
  } else if(phase.phase === 'prefinals' && pfb){
    pfb.style.display = 'flex';
    pfb.innerHTML = '<span style="font-family:var(--serif);font-size:18px">✦</span><div><strong>Pre-Finals in '+phase.daysLeft+' days</strong> — '+phase.exam.name+'</div>';
  }
}

function rdashFull(){
  rdash();
  initWelcome();
}

/* ─── EASTER EGGS ─────────────────────────────────────────────────────── */
let monkeyClicks = 0;
function monkeyTap(){
  monkeyClicks++;
  const m = document.querySelector('.s-foot .monkey');
  if(!m) return;
  if(monkeyClicks % 5 === 0){
    const messages = ['🍌','🐒','✨','🎶','🩺'];
    const t = document.createElement('div');
    t.textContent = messages[Math.floor(Math.random()*messages.length)];
    t.style.cssText = 'position:fixed;left:'+(m.getBoundingClientRect().left+10)+'px;bottom:60px;font-size:24px;animation:floatup 1.5s ease-out forwards;pointer-events:none;z-index:999';
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 1500);
  }
  m.style.transform = 'rotate('+(Math.random()*30-15)+'deg) scale(1.2)';
  setTimeout(() => { m.style.transform = ''; }, 300);
}

/* ─── INIT ────────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function(){
  setTheme(getTheme());
  rdashFull();
  document.querySelectorAll('.mbd').forEach(m =>
    m.addEventListener('click', e => { if(e.target === m) m.classList.remove('open'); })
  );
  const tbtn = document.getElementById('timer-btn');
  if(tbtn){
    tbtn.addEventListener('click', function(){
      if('Notification' in window && Notification.permission === 'default'){
        Notification.requestPermission();
      }
    }, { once: true });
  }
});
