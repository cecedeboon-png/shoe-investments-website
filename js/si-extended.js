(function(){
var p=location.pathname;

// ===== HOME: Card cleanup (moved from inline script) =====
if(p.match(/^\/?$/)){
  var seen={};
  document.querySelectorAll('.si-portfolio-meta').forEach(function(m){
    var card=m.parentElement;var h=card?card.querySelector('h3,h4'):null;
    if(!h)return;var key=h.textContent.trim();
    if(seen[key])m.style.display='none';
    else{seen[key]=true;m.textContent=m.textContent.replace(/\s*\u2022\s*Partner sinds \d{4}/,'')}
  });
  document.querySelectorAll('.si-badge-current,.si-badge-exit').forEach(function(b){
    if(b.textContent.indexOf('This is some text')>-1)b.style.display='none'
  });
  var links={"Mama's Maaltijden":'https://mamasmaaltijden.nl','Loop':'https://loop-biotech.com','Equalture':'https://equalture.com'};
  document.querySelectorAll('.si-value-card p').forEach(function(p){
    for(var name in links){if(p.innerHTML.indexOf(name)>-1)p.innerHTML=p.innerHTML.replace(name,'<a href="'+links[name]+'" target="_blank" style="color:#1a5276;font-weight:700;text-decoration:none">'+name+'</a>')}
  });
}

// ===== PORTFOLIO DETAIL: Full info with correct founders =====
var dm=p.match(/^\/portfolio\/([^\/]+)/);
if(dm){
  var slug=dm[1];
  var companies={
    'aquablu':{n:'Aquablu',f:'Marnix Stokvis & Marc van Zuylen',y:2025,c:'Nederland',s:'Water Technology',u:'aquablu.com'},
    'brainial':{n:'Brainial',f:'Fedor Klinkenberg & Taco Hiddink',y:2025,c:'Nederland',s:'AI / Software',u:'brainial.com'},
    'leasy':{n:'Leasy',f:'Gregorio Gilardini & Alejandro Garay',y:2025,c:'Spanje',s:'Fintech / Auto Leasing',u:'leasy.com'},
    'anthropic':{n:'Anthropic',f:'Dario Amodei',y:2026,c:'Verenigde Staten',s:'Artificial Intelligence',u:'anthropic.com'},
    'mamas-maaltijden':{n:"Mama's Maaltijden",f:'Serdar Tolenaar, Rick Hageman & Henk Brussaard',y:2023,c:'Nederland',s:'Food',u:'mamasmaaltijden.nl'},
    'apollo-lane':{n:'Apollo Lane',f:'Pieter Schoen & Diederik Ingen Housz',y:2026,c:'Nederland',s:'Investeringen'},
    'carv':{n:'Carv',f:'Matthijs Metzemaekers & Barend Raaff',y:2025,c:'Nederland',s:'HR Tech',u:'carv.com'},
    'loop':{n:'Loop',f:'Bob Hendrikx & Lonneke Westhoff',y:2022,c:'Nederland',s:'Duurzaamheid',u:'loop-biotech.com'},
    'revolut':{n:'Revolut',f:'Nik Storonsky',y:2026,c:'Verenigd Koninkrijk',s:'Fintech',u:'revolut.com'},
    'ixxi':{n:'IXXI',f:'Erik-Jan Schreurs, Luc Hendriks & Thomas Beguin',y:2021,c:'Nederland',s:'Design',u:'ixxi.com'},
    'grantific':{n:'Grantific',f:'Theodoor Rutgers',y:2026,c:'Nederland',s:'Subsidies',u:'grantific.com'},
    'bright-bird':{n:'Bright Bird',f:'Camiel Kuik & Claris Schoen',y:2024,c:'Nederland',s:'EdTech',u:'brightbird.app'},
    'airwallex':{n:'Airwallex',f:'Jack Zhang',y:2026,c:'Australi\u00eb',s:'Fintech',u:'airwallex.com'},
    'liquido-doro':{n:"Liquido d'Oro",f:'Ridder Drost',y:2021,c:'Nederland',s:'Food',u:'liquidodoro.com'},
    'zkr':{n:'Zkr.',f:'Khalid Maatoug & Tarik Joemmanbaks',y:2023,c:'Nederland',s:'Fintech',u:'zkr.nl'},
    'replit':{n:'Replit',f:'Amjad Masad & Haya Odeh',y:2025,c:'Verenigde Staten',s:'Developer Tools',u:'replit.com'},
    'creditchecken':{n:'Creditchecken',f:'Tarik Joemmanbaks',y:2023,c:'Nederland',s:'Fintech',u:'creditchecken.nl'},
    'equalture':{n:'Equalture',f:'Fleur & Charlotte Melkert',y:2021,c:'Nederland',s:'HR Tech',u:'equalture.com'},
    'focus':{n:'Focus',f:'Thijs van de Poll & Jard van Ingen',y:2023,c:'Nederland',s:'AI / Patent Intelligence',u:'focus.ai'},
    'colect':{n:'Colect',f:'Nick Andriesse',y:2019,c:'Nederland',s:'Fashion Tech',u:'colect.io'},
    'swishfund':{n:'Swishfund',f:'Pieter Schoen & Bart-Jan van Genderen',y:2016,c:'Nederland',s:'Fintech',u:'swishfund.nl'},
    'dealroom':{n:'Dealroom',f:'Yoram Wijngaarde',y:2018,c:'Nederland',s:'Data',u:'dealroom.co'},
    'creative-clicks':{n:'Creative Clicks',f:'Ramon van den Bulk & Raymond Kokken',y:2012,c:'Nederland',s:'AdTech',u:'creativeclicks.com'},
    'mega':{n:'Mega',f:'Micheal Corhay & Thomas Coune',y:2015,c:'Nederland',s:'Energie',x:true},
    'isolatiespecialist':{n:'Isolatiespecialist',f:'Marc & Margreet Anker',y:2017,c:'Nederland',s:'Bouw',x:true},
    'charlie-temple':{n:'Charlie Temple',f:'Leon Planken',y:2016,c:'Nederland',s:'E-commerce',x:true}
  };

  var co=companies[slug];
  if(co){
    // Remove any existing injected info bar from inline script
    var existing=document.querySelector('[data-si-info]');
    if(existing)existing.remove();

    // Also update the inline script's simple info bar if present
    var oldBar=document.querySelector('h1+div');
    if(oldBar&&oldBar.innerHTML.indexOf('Oprichter')>-1)oldBar.remove();

    // Build structured info bar matching GitHub
    var status=co.x?'Exit':'Huidig portfolio';
    var bar=document.createElement('div');
    bar.setAttribute('data-si-info','1');
    bar.style.cssText='display:flex;flex-wrap:wrap;gap:32px;padding:24px 0;border-bottom:1px solid #e2e6ea;margin-bottom:32px';
    function mkC(l,v){return'<div style="min-width:140px"><div style="font-size:11px;font-weight:700;color:#1C5FA8;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px">'+l+'</div><div style="font-size:15px;color:#0A2342;font-weight:500">'+v+'</div></div>'}
    bar.innerHTML=mkC('Founders',co.f)+mkC('Sector',co.s)+mkC('Status',status)+mkC('Land',co.c);
    var h1=document.querySelector('h1');
    if(h1){
      // Remove existing info divs between h1 and the white section
      var next=h1.nextElementSibling;
      while(next&&next.tagName==='DIV'&&next.style.padding){
        var toRemove=next;next=next.nextElementSibling;toRemove.remove();
      }
      h1.after(bar);
    }

    // Add tagline
    var taglines={
      'aquablu':'Duurzame wateroplossingen voor kantoren',
      'brainial':'AI-software voor aanbestedingen',
      'leasy':'Transparante autolease voor consumenten',
      'anthropic':'AI-veiligheidsbedrijf achter Claude',
      'mamas-maaltijden':'Marktleider in koelverse maaltijden',
      'apollo-lane':'Investeringsvehikel van Pieter Schoen',
      'carv':'AI recruitment platform voor recruiters',
      'loop':'Biologisch afbreekbare doodskisten',
      'revolut':'Europees fintech-platform voor bankieren',
      'ixxi':'Modulaire wanddecoratie in 30+ landen',
      'grantific':'Subsidieplatform voor ondernemers',
      'bright-bird':'Educatief platform voor kinderen',
      'airwallex':'Grensoverschrijdende betalingen voor bedrijven',
      'liquido-doro':'Premium Italiaanse olijfolie',
      'zkr':'Kredietoplossingen voor consumenten',
      'replit':'Online coding platform met AI',
      'creditchecken':'Inzicht in je kredietwaardigheid',
      'equalture':'Eerlijker werven via gamificatie',
      'focus':'AI-gedreven patent intelligence',
      'colect':'B2B fashion platform voor merken',
      'swishfund':'Snelle financiering voor het MKB',
      'dealroom':'Toonaangevende Europese startup data',
      'creative-clicks':'Internationaal performance advertising',
      'mega':'Groene energieleverancier (exit 2025)',
      'isolatiespecialist':'Isolatiediensten voor woningen (exit 2023)',
      'charlie-temple':'Online brillenretailer met thuspasservice (exit 2019)'
    };
    // Show tagline below h1, above info bar
    if(taglines[slug]){
      document.querySelectorAll('*').forEach(function(e){
        if(e.children.length===0&&e.textContent.trim()==='Company tagline goes here'){
          e.textContent=taglines[slug];e.style.display='';
          e.style.cssText='font-size:18px;color:rgba(255,255,255,.8);margin-top:8px';
        }
      });
    }

    // Website button
    if(co.u){
      document.querySelectorAll('a').forEach(function(a){
        if(a.textContent.indexOf('Bezoek website')>-1||a.textContent.indexOf('Visit website')>-1){
          a.href='https://'+co.u;a.target='_blank';
        }
      });
      // Also ensure there's a visible website button
      var btnExists=false;
      document.querySelectorAll('a').forEach(function(a){if(a.textContent.indexOf('Bezoek')>-1||a.textContent.indexOf('BEZOEK')>-1)btnExists=true});
      if(!btnExists){
        var btn=document.createElement('a');
        btn.href='https://'+co.u;btn.target='_blank';
        btn.textContent='BEZOEK WEBSITE \u2192';
        btn.style.cssText='display:inline-block;padding:12px 24px;border:2px solid #0A2342;color:#0A2342;font-size:13px;font-weight:700;letter-spacing:1px;text-decoration:none;margin-top:24px;transition:all .2s';
        btn.onmouseenter=function(){btn.style.background='#0A2342';btn.style.color='#fff'};
        btn.onmouseleave=function(){btn.style.background='';btn.style.color='#0A2342'};
        bar.after(btn);
      }
    }
  }
}

// ===== PORTFOLIO PAGE: Tooltips + VOCCP section =====
if(p.indexOf('/portfolio')>-1&&!p.match(/\/portfolio\/.+/)){
  // Inject tooltip CSS
  var css=document.createElement('style');
  css.textContent='.si-card-tooltip{position:absolute;bottom:0;left:0;right:0;background:rgba(10,35,66,.92);color:#fff;font-size:13px;font-weight:500;padding:10px 16px;transform:translateY(100%);transition:transform .22s ease;line-height:1.4;pointer-events:none;z-index:10;backdrop-filter:blur(4px)}.si-portfolio-card:hover .si-card-tooltip{transform:translateY(0)}';
  document.head.appendChild(css);

  var tips={
    'Aquablu':'Duurzame wateroplossingen voor kantoren',
    'Brainial':'AI-software voor aanbestedingen',
    'Leasy':'Transparante autolease voor consumenten',
    'Anthropic':'AI-veiligheidsbedrijf achter Claude',
    "Mama's Maaltijden":'Marktleider in koelverse maaltijden',
    'Apollo Lane':'Investeringsvehikel van Pieter Schoen',
    'Carv':'AI recruitment platform voor recruiters',
    'Loop':'Biologisch afbreekbare doodskisten',
    'Revolut':'Europees fintech-platform voor bankieren',
    'IXXI':'Modulaire wanddecoratie in 30+ landen',
    'Grantific':'Subsidieplatform voor ondernemers',
    'Bright Bird':'Educatief platform voor kinderen',
    'Airwallex':'Grensoverschrijdende betalingen voor bedrijven',
    "Liquido d'Oro":'Premium Italiaanse olijfolie',
    'Zkr.':'Kredietoplossingen voor consumenten',
    'Replit':'Online coding platform met AI',
    'Creditchecken':'Inzicht in je kredietwaardigheid',
    'Equalture':'Eerlijker werven via gamificatie',
    'Focus':'AI-gedreven patent intelligence',
    'Colect':'B2B fashion platform voor merken',
    'Swishfund':'Snelle financiering voor het MKB',
    'Dealroom':'Toonaangevende Europese startup data',
    'Creative Clicks':'Internationaal performance advertising',
    'Mega':'Groene energieleverancier (exit 2025)',
    'Isolatiespecialist':'Isolatiediensten voor woningen (exit 2023)',
    'Charlie Temple':'Online brillenretailer met thuspasservice (exit 2019)'
  };

  document.querySelectorAll('.si-portfolio-card').forEach(function(card){
    var h=card.querySelector('h3,h4');if(!h)return;
    var n=h.textContent.trim();
    if(tips[n]){
      card.style.position='relative';card.style.overflow='hidden';
      var tip=document.createElement('div');
      tip.className='si-card-tooltip';tip.textContent=tips[n];
      card.appendChild(tip);
    }
  });

  // VOCCP Section
  var voccp=[
    {n:'Hera Life',u:'https://heralife.nl',d:'Gespecialiseerde verzekeraar in overlijdensrisicoverzekeringen met een volledig digitaal en transparant proces.',y:2018},
    {n:'Minibrew',u:'https://minibrew.io',d:'Ontwikkelde een thuisbrouwsysteem waarmee consumenten via een app professioneel bier konden brouwen.'},
    {n:'Senior Service',u:'https://seniorservice.nl',d:'Mantelzorgplatform met landelijke dekking dat ouderen en hun families verbindt met professionele hulp.',y:2015},
    {n:'Studyportals',u:'https://studyportals.com',d:'Internationaal opleidingsplatform dat studenten wereldwijd helpt de juiste studie te vinden.',y:2010},
    {n:'SphereMall',u:'https://spheremall.com',d:'Intelligent e-commerce platform dat merken helpt hun online verkoop te optimaliseren.',y:2016},
    {n:'Studyflow',u:'https://studyflow.nl',d:'E-learningplatform voor middelbare scholen met interactieve lesstof en voortgangsmonitoring.',y:2016},
    {n:'Cleeng',u:'https://cleeng.com',d:'Platform voor monetisatie van videocontent, gebruikt door grote mediapartijen wereldwijd.',y:2016},
    {n:'WePrevent',u:'https://weprevent.nl',d:'Aanbieder van preventieve beveiligingsoplossingen voor woningen en bedrijfspanden.',y:2015}
  ];

  var grid=document.querySelector('.si-portfolio-card');
  if(grid){
    var section=grid.parentElement.closest('section')||grid.parentElement.parentElement;
    var vs=document.createElement('section');
    vs.style.cssText='background:#f7f8fa;padding:80px 0;margin-top:40px';
    var ct=document.createElement('div');
    ct.style.cssText='max-width:1200px;margin:0 auto;padding:0 24px';
    ct.innerHTML='<p style="font-size:11px;font-weight:700;color:#1C5FA8;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:8px">VOC Capital Partners</p><h2 style="font-size:32px;font-weight:700;color:#0A2342;margin:0 0 8px">VOCCP Portfolio</h2><p style="font-size:16px;color:#6B7A8D;margin:0 0 36px">Historische participaties vanuit VOC Capital Partners.</p>';

    var vg=document.createElement('div');
    vg.style.cssText='display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:20px';

    voccp.forEach(function(v){
      var card=document.createElement('article');
      card.style.cssText='background:#fff;border:1px solid #e2e6ea;border-radius:4px;overflow:hidden;padding-bottom:20px;transition:box-shadow .25s ease,transform .25s ease;cursor:pointer';
      card.onmouseenter=function(){card.style.boxShadow='0 6px 24px rgba(10,35,66,.14)';card.style.transform='translateY(-3px)'};
      card.onmouseleave=function(){card.style.boxShadow='';card.style.transform=''};
      card.onclick=function(){window.open(v.u,'_blank')};
      card.innerHTML='<div style="width:100%;height:180px;background:#f0f2f5;display:flex;align-items:center;justify-content:center;border-bottom:1px solid #e2e6ea"><span style="font-size:28px;font-weight:800;color:#0A2342;opacity:.2">'+v.n[0]+'</span></div><h4 style="font-size:15px;font-weight:700;color:#0A2342;margin:16px 20px 8px">'+v.n+'</h4><p style="font-size:13px;color:#6B7A8D;margin:0 20px 10px;line-height:1.5">'+v.d+'</p>'+(v.y?'<p style="font-size:12px;color:#1C5FA8;font-weight:600;margin:0 20px">VOC Capital Partners investeerder sinds '+v.y+'.</p>':'');
      vg.appendChild(card);
    });

    ct.appendChild(vg);vs.appendChild(ct);
    // Insert after the portfolio content
    var mainContent=document.querySelector('[class*="collection-list"]')||grid.parentElement;
    var insertPoint=mainContent.closest('section')||mainContent.parentElement;
    if(insertPoint&&insertPoint.parentElement)insertPoint.parentElement.insertBefore(vs,insertPoint.nextSibling);
  }
}

// ===== FONDSEN: Navy hover overlay with descriptions =====
if(p.indexOf('fondsen')>-1){
  var fcss=document.createElement('style');
  fcss.textContent='.si-fund-hover{position:absolute;inset:0;background:#0A2342;color:#fff;padding:18px;display:flex;flex-direction:column;gap:6px;opacity:0;visibility:hidden;z-index:10;transform:translateY(8px);transition:opacity .25s ease,visibility .25s ease,transform .25s ease;overflow-y:auto;pointer-events:none}.si-portfolio-card:hover .si-fund-hover{opacity:1;visibility:visible;transform:translateY(0);pointer-events:auto}.si-fund-hover-name{font-size:14px;font-weight:800}.si-fund-hover-desc{font-size:12px;color:rgba(255,255,255,.75);line-height:1.5}.si-fund-hover-subs{list-style:none;padding:0;margin:6px 0 0;border-top:1px solid rgba(255,255,255,.15);padding-top:6px}.si-fund-hover-subs li{font-size:11px;color:rgba(255,255,255,.6);padding:2px 0 2px 12px;position:relative}.si-fund-hover-subs li::before{content:"";position:absolute;left:0;top:8px;width:4px;height:4px;border-radius:50%;background:rgba(255,255,255,.4)}';
  document.head.appendChild(fcss);

  var funds={
    'Goldman Sachs':{d:'Toonaangevend wereldwijd investeringsbankier en vermogensbeheerder.'},
    'Sky9 Capital':{d:'Vroegfase en growth-stage VC gericht op tech-scale-ups in Europa en Azi\u00eb.',s:['Sky9 Capital MVP Fund II','Sky9 Capital Fund V']},
    'Greyhound Capital':{d:'Europees groeifonds dat investeert in bewezen, snel groeiende technologiebedrijven.',s:['Greyhound Capital Partners','Greyhound Capital Technology']},
    'Archipelago':{d:'Investeringsfonds met focus op snelgroeiende ondernemingen in Aziatische markten.',s:['Archipelago Asia Focus Fund','Archipelago Asia Focus Fund II']},
    'Integra':{d:'Private equity fonds met focus op Europese groei- en buy-out transacties.',s:['Integra I','Integra II']},
    'ALS Investment Fund':{d:'Reeks investeringsfondsen gericht op onderzoek en behandeling van ALS.',s:['ALS Fund I','ALS Fund II','ALS Fund III','ALS Fund IV','ALS Fund V','ALS Fund VI']},
    'Forbion':{d:'Toonaangevend Europees life sciences VC fonds gericht op biotech en medtech.',s:['Forbion Growth Fund','Forbion Capital Fund IV','Forbion Capital Fund V']},
    'Knight Capital':{d:'Internationaal private capital huis met focus op middelgrote ondernemingen en waardecreatie op de lange termijn.'},
    'Newport Capital':{d:'Investeert in stabiele groeibedrijven en ondersteunt managementteams bij operationele verbetering.'},
    'Wealth Management Partners':{d:'Gespecialiseerde private equity fondsen gericht op secondaire transacties.',s:['WMP Global Secondaries','WMP Pool G-2019','WMP Private Equity Pool I & II']},
    'Waterland':{d:'Europees private equity fonds met een buy-and-build aanpak in zorg, software en dienstverlening.'},
    'Parcom':{d:'Nederlandse investeerder die bedrijven begeleidt bij transformatie, internationalisering en duurzame groei.'},
    'Bencis Capital Partners':{d:'Benelux private equity partij met focus op professionalisering en schaalvergroting.'},
    'Gilde':{d:'Nu Rivean Capital, Europees buyout fonds.'},
    'Nordian':{d:'Mid-market PE fonds dat actief samenwerkt met managementteams op strategische en operationele waardecreatie.'},
    'Slingshot':{d:'Vroegfase venture capital fonds dat investeert in ambitieuze Nederlandse startups.',s:['Slingshot Ventures II','Slingshot Ventures III']},
    'Marktlink':{d:'Nu Marktlink Capital, investeert in ambitieuze mkb-bedrijven met groeipotentieel.'},
    'CVC Capital Partners':{d:'Toonaangevend private equity fonds met wereldwijde investeringen.',s:['Fund IX']},
    'Soci\u00e9t\u00e9':{d:'Internationale financi\u00eble instelling met brede expertise in corporate finance en duurzame transities.'}
  };

  document.querySelectorAll('.si-portfolio-card').forEach(function(card){
    var h=card.querySelector('h3,h4');if(!h)return;
    var n=h.textContent.trim(),fund=null;
    for(var k in funds){if(n.indexOf(k)>-1){fund=funds[k];break}}
    if(!fund)return;
    card.style.position='relative';card.style.overflow='hidden';
    card.style.transition='box-shadow .25s ease,transform .25s ease';
    var ov=document.createElement('div');ov.className='si-fund-hover';
    var nm=document.createElement('div');nm.className='si-fund-hover-name';nm.textContent=n;ov.appendChild(nm);
    var ds=document.createElement('div');ds.className='si-fund-hover-desc';ds.textContent=fund.d;ov.appendChild(ds);
    if(fund.s&&fund.s.length){
      var ul=document.createElement('ul');ul.className='si-fund-hover-subs';
      fund.s.forEach(function(sub){var li=document.createElement('li');li.textContent=sub;ul.appendChild(li)});
      ov.appendChild(ul);
    }
    card.appendChild(ov);
  });
}

})();
