'use strict';
// ===== BONUS ROUNDS: Save Peter! (unlock after Rhino Rumble is beaten; saved in localStorage) =====
// Loaded after the main game script; it adds levels 6 + 7 and wraps a few main functions.
const MAIN_LAST=4;
if(save.reached>MAIN_LAST)save.reached=MAIN_LAST;
SOLID.add('X');
THEMES.push(
 {sky:['#121a48','#5a3f8e'],far:'#2c2a62',hill:'#24204f',tree:'#120e2a',grass:'#3f8a4a',grass2:'#2c6436',dirt:'#5c4a5c',dirt2:'#473a4a',stone:'#7c7c96',sun:'#f6f2d6'},
 {sky:['#26102e','#9a3a4a'],far:'#3c2244',hill:'#2e1a36',tree:'#1a0e20',grass:'#5e6e3a',grass2:'#46542a',dirt:'#4e3c3c',dirt2:'#3c2e2e',stone:'#8a8296',sun:'#ffd9a0'});
AU.SONGS.push([0,3,7,10,12,10,7,3,0,5,8,12,15,12,8,5],[0,1,5,6,7,6,5,1,0,1,5,8,7,6,5,3]);

// ---- Peter likeness: the same hand-drawn cartoon Peter used in Paper Route Peter (source: /workspace/peter-likeness/peter_portrait.js) ----
// Peter bust portrait: hand-drawn vector cartoon (outlined), drawn from scratch with canvas paths.
// (cx,by) = bottom centre of the bust, h = bust height. ctx passed explicitly.
function drawPeterPortrait(x2,cx,by,h,t){t=t||0;const u=h/100,K='#3a2418';x2.save();x2.translate(cx,by);x2.scale(u,u);x2.lineJoin='round';x2.lineCap='round';
 const P=(pts,fill,lw,close)=>{lw=lw===undefined?2.2:lw;x2.beginPath();x2.moveTo(pts[0][0],pts[0][1]);for(let i=1;i<pts.length;i++){const q=pts[i];if(q.length==6)x2.bezierCurveTo(q[0],q[1],q[2],q[3],q[4],q[5]);else if(q.length==4)x2.quadraticCurveTo(q[0],q[1],q[2],q[3]);else x2.lineTo(q[0],q[1])}if(close!==false)x2.closePath();if(fill){x2.fillStyle=fill;x2.fill()}if(lw){x2.strokeStyle=K;x2.lineWidth=lw;x2.stroke()}};
 const E=(x,y,rx,ry,fill,lw,rot)=>{lw=lw===undefined?2.2:lw;x2.beginPath();x2.ellipse(x,y,rx,ry,rot||0,0,Math.PI*2);if(fill){x2.fillStyle=fill;x2.fill()}if(lw){x2.strokeStyle=K;x2.lineWidth=lw;x2.stroke()}};
 const L=(pts,col,lw)=>{P(pts,null,0,false);x2.strokeStyle=col;x2.lineWidth=lw;x2.stroke()};
 const SKIN='#f0b493',SK2='#d8916f',ROSE='rgba(222,104,92,.38)',HAIR='#7c6c5e',HAIR2='#a99d92',HAIR3='#5e5044',BR='#7a6450',BEARD='#d6d1c8',BEARD2='#b4ac9f',MUS='#93816e',SHIRT='#e8542c',SH2='#b8401e',STRAP='#8a5a2c';
 const blink=((t*0.5)%4)>3.85;
 // shoulders: orange paperboy shirt, white tee collar, newspaper-bag strap
 P([[-48,0],[-48,-12,-40,-20],[-30,-27,-17,-28],[17,-28],[30,-27,40,-20],[48,-12,48,0]],SHIRT);
 L([[-34,-20],[-30,-10,-31,0]],SH2,1.6);L([[34,-20],[30,-10,31,0]],SH2,1.6);
 P([[-17,-28],[-9,-21,0,-20],[9,-21,17,-28],[11,-30],[0,-27],[-11,-30]],'#f4f0e6',1.8);
 P([[-40,-20],[-33,-25],[30,0],[18,0]],STRAP,1.8);L([[-35,-21],[23,0]],'#b07a40',1);
 // neck
 P([[-15,-30],[-16,-40],[16,-40],[15,-30],[0,-25]],SK2,1.8);
 // ears
 for(const sx of[-1,1]){E(sx*31,-60,4.6,7.4,SKIN,2.2);L([[sx*31.5,-65],[sx*29,-60,sx*31,-55]],SK2,1.4)}
 x2.save();x2.rotate(-0.04);
 // head: broad forehead, wide cheeks and jowls
 P([[0,-99],[-19,-99,-26,-88],[-31,-76,-32,-60],[-34,-46,-29,-36],[-20,-25,0,-25],[20,-25,29,-36],[34,-46,32,-60],[31,-76,26,-88],[19,-99,0,-99]],SKIN);
 // jowl shading
 L([[-29,-47],[-26,-36,-17,-32]],SK2,1.4);L([[29,-47],[26,-36,17,-32]],SK2,1.4);
 // short grey-brown hair: crew cut, slightly receding at the temples, greyer at the sides
 P([[-30,-72],[-31,-87,-24,-96],[-14,-102.5,0,-102.5],[14,-102.5,24,-96],[31,-87,30,-72],[28,-77],[26.5,-86],[20,-91,12,-90],[4,-93,-3,-92],[-12,-91,-20,-91],[-26.5,-86],[-28,-77]],HAIR,2);
 for(const [x,y] of[[-20,-95],[-12,-99],[-4,-97],[6,-99.5],[14,-97],[22,-93],[-25,-89],[26,-87],[0,-95],[-16,-93],[10,-94],[-8,-100],[18,-96]])L([[x,y],[x+1.5,y-2.2]],(x*7+y)%3?HAIR2:HAIR3,1.2);
 for(const sx of[-1,1])P([[sx*29,-73],[sx*30.5,-80,sx*28,-86],[sx*26.5,-80,sx*27,-74]],HAIR2,1.2);
 
 // eyebrows: raised high and arched (his trademark surprised look)
 P([[-22,-75],[-18,-85,-6,-81],[-5,-78.5],[-16,-81.5,-21,-73]],BR,1.4);
 P([[22,-76],[16,-83,6,-80],[5,-77.8],[15,-80,21,-74]],BR,1.4);
 // forehead lines
 L([[-10,-85],[0,-87,10,-85]],SK2,1);L([[-7,-88.5],[0,-89.6,7,-88.5]],SK2,0.9);
 // eyes: wide open, blue
 for(const sx of[-1,1]){const ex=sx*12,ey=-68;
  if(blink){L([[ex-6,ey],[ex,ey+1.6,ex+6,ey]],K,2)}
  else{E(ex,ey,6.4,5,'#ffffff',2);E(ex+sx*0.6,ey+.3,3.4,3.6,'#4c86c8',0);E(ex+sx*0.6,ey+.3,1.6,1.8,'#1a1a2a',0);E(ex+sx*0.6-1.2,ey-1.2,1,1,'#ffffff',0);L([[ex-6.4,ey-1],[ex,ey-6.2,ex+6.4,ey-1]],K,2.2)}
  L([[ex-5,ey+6],[ex,ey+8.4,ex+5,ey+6]],SK2,1.3)}
 // nose: broad, rounded tip
 L([[-3.5,-71],[-4.5,-62,-6.5,-56]],SK2,1.4);L([[3.5,-71],[4,-64,5,-58]],SK2,1);
 P([[-8.5,-52],[-9.5,-47.5,-4.5,-47.5],[-2,-46,0,-46],[2,-46,4.5,-47.5],[9.5,-47.5,8.5,-52],[6,-55,3.5,-55],[2,-58,0,-58],[-2,-58,-3.5,-55],[-6,-55,-8.5,-52]],SKIN,1.8);
 E(-4,-49.5,1.6,1,'#8a4a3a',0);E(4,-49.5,1.6,1,'#8a4a3a',0);
 // rosy cheeks
 x2.fillStyle=ROSE;x2.beginPath();x2.ellipse(-19,-52,6,4,0,0,Math.PI*2);x2.fill();x2.beginPath();x2.ellipse(19,-52,6,4,0,0,Math.PI*2);x2.fill();
 // goatee: grey-white chin beard, long and full
 P([[-12,-40],[-13.5,-31,-10,-23],[-5,-16.5,0,-15.5],[5,-16.5,10,-23],[13.5,-31,12,-40],[6,-37,0,-37],[-6,-37,-12,-40]],BEARD,2);E(0,-35.5,5.5,2.2,'#b8afa2',0);
 for(const x of[-8,-4.5,-1,2.5,6,9])L([[x,-32],[x*.85+.4,-26,x*.6,-20]],BEARD2,.9);
 // moustache: brown-grey, around the mouth into the goatee
 P([[-1,-46],[-7,-47,-12,-44],[-14,-40,-12,-35],[-10,-39],[-6,-42,0,-42.5],[6,-42,10,-39],[12,-35],[14,-40,12,-44],[7,-47,1,-46]],MUS,1.6);
 // mouth: slightly open, mid-sentence
 P([[-5,-39.5],[0,-41,5,-39.5],[3,-35.5,0,-35.2],[-3,-35.5,-5,-39.5]],'#6a2a22',1.4);
 L([[-3.5,-36.2],[0,-35,3.5,-36.2]],'#c86a5e',1.4);
 x2.restore();x2.restore()}
const PETER_BUST=(()=>{const c=document.createElement('canvas');c.width=c.height=96;const x=c.getContext('2d');drawPeterPortrait(x,48,96,92,0);return c})();
function drawPeterMini(g,cx,bottom,o){o=o||{};cx=Math.round(cx);bottom=Math.round(bottom);const wave=o.wave?Math.sin(frame*0.3):0;
 g.fillStyle='#2f4f86';g.fillRect(cx-5,bottom-9,4,9);g.fillRect(cx+1,bottom-9,4,9);g.fillStyle='#24252a';g.fillRect(cx-6,bottom-2,5,2);g.fillRect(cx+1,bottom-2,5,2);
 g.fillStyle='#e8542c';g.fillRect(cx-7,bottom-15,14,7);
 g.fillStyle='#e8542c';if(o.wave){g.fillRect(cx+6,bottom-22-Math.round(wave*2),3,8);g.fillRect(cx-9,bottom-22+Math.round(wave*2),3,8);g.fillStyle='#f0b493';g.fillRect(cx+6,bottom-25-Math.round(wave*2),3,3);g.fillRect(cx-9,bottom-25+Math.round(wave*2),3,3)}
 else{g.fillRect(cx-9,bottom-15,3,7);g.fillRect(cx+6,bottom-15,3,7);g.fillStyle='#f0b493';g.fillRect(cx-9,bottom-9,3,2);g.fillRect(cx+6,bottom-9,3,2)}
 g.drawImage(PETER_BUST,cx-11,bottom-36,22,22)}

// ---- level helpers ----
Builder.prototype.lever=function(x,y){this.fill(x,x,y,y,'K')};
Builder.prototype.gate=function(x,y1){this.fill(x,x,0,y1,'X')};
LEVELS.push(
{name:'Rescue Run',theme:5,w:212,bonus:1,build(B){
 B.ground(0,15,12);B.start(3);B.sign(6,'Oh no! Cackles the Hyena King captured Peter! She has to use EVERY move to reach the Hyena Fortress!');
 B.en('y',13);B.gems(8,10,10);
 B.ground(16,21,12);B.fill(18,19,0,7,'=');B.fill(18,19,8,11,'C');
 B.water(22,29);B.hook(24,5);B.hook(28,5);B.gems(24,28,8);
 B.ground(30,45,12);B.en('p',36);B.en('v',40,3);B.gems(32,34,10);
 B.ground(46,52,6);B.fill(49,49,5,5,'^');B.gems(47,48,4);
 B.ground(53,56,6);B.hook(60,2);B.gems(59,61,5);
 B.ground(63,80,9);B.flag(65);B.sign(67,'A locked gate! Shoot your TONGUE at the lever to pull it open.');
 B.fill(70,72,8,8,'^');B.lever(74,7);B.gate(75,8);B.en('b',78);
 B.ground(85,100,12);B.en('y',90);B.en('y',96);B.fill(88,88,8,8,'?');
 B.plat(101,106,9);B.plat(108,112,7);B.plat(114,118,9);B.en('e',107,3);B.en('e',113,4);B.gems(108,112,5);
 B.ground(119,140,12);B.flag(121);B.fill(126,126,0,7,'=');B.fill(126,126,8,11,'C');B.en('p',131);B.en('b',135);B.en('y',138);
 B.ground(141,150,7);B.en('b',146);
 B.hook(153,3);B.hook(157,3);B.gems(152,158,7);
 B.ground(159,175,10);B.en('v',165,2);B.en('y',170);B.obj('L',168,8);
 B.ground(176,182,4);B.gems(177,181,2);
 B.ground(183,211,12);B.en('y',190);B.en('p',196);B.en('v',199,3);B.goal(205);
}},
{name:'Hyena Fortress',theme:6,w:150,bonus:2,boss:'king',arena:120,build(B){
 B.ground(0,16,12);B.start(3);B.sign(6,'The Hyena Fortress! Peter is locked in a cage up top. She has to fight her way in and beat Cackles!');
 B.en('y',11);B.en('y',15);
 B.ground(17,24,7,'=');B.en('v',20,2);B.en('p',22);
 B.ground(25,30,4,'=');B.gems(26,29,2);
 B.water(31,38);B.hook(34,5);B.hook(37,6);B.gems(33,37,8);
 B.ground(39,55,11);B.flag(41);B.fill(44,44,0,6,'=');B.fill(44,44,7,10,'C');B.en('y',48);B.en('y',52);
 B.ground(56,66,11);B.fill(60,61,10,10,'^');B.lever(63,9);B.gate(64,10);
 B.ground(65,75,11);B.en('p',70);
 B.ground(76,88,5,'=');B.en('b',85);
 B.hook(92,2);B.hook(95,3);B.gems(91,95,6);
 B.ground(97,119,10);B.flag(99);B.en('y',105);B.en('y',110);B.en('v',108,2);B.obj('L',101,8);B.obj('L',116,8);
 B.ground(120,149,12);B.fill(149,149,0,14,'=');B.plat(124,127,8);B.plat(142,145,8);B.hook(131,4);B.hook(138,4);
}});

// ---- loading: the Hyena King boss, cage with Peter ----
const _loadLevel=loadLevel;
loadLevel=function(i){_loadLevel(i);const def=LEVELS[i];LV.bones=[];
 if(def.boss==='king'){const ax=def.arena*TS;LV.arenaCol=def.arena;
  LV.boss={kind:'king',name:'CACKLES THE HYENA KING',ax,x:ax+22*TS,y:12*TS-30,w:40,h:30,vx:0,vy:0,hp:8,max:8,st:'wait',t:0,face:-1,flash:0,ground:false};
  LV.cage={x:ax+14*TS-4,y:TS,w:24,h:34,vy:0,st:'hang',t:0};LV.goal=null}};
const _afterDeath=afterDeath;
afterDeath=function(){const B=LV&&LV.boss;_afterDeath();LV.bones=[];
 if(B&&B.kind==='king'&&B.hp>0){Object.assign(B,{x:B.ax+22*TS,y:12*TS-B.h,vx:0,vy:0,t:0,st:B.arena?'idle':'wait'})}};
function openGate(cx,cy){for(let y=0;y<ROWS;y++)for(let x=0;x<LV.w;x++)if(LV.g[y][x]==='X'){LV.g[y][x]='.';burst(x*TS+8,y*TS+8,'#9aa0aa',3,1.5)}
 LV.g[cy][cx]='k';AU.sfx('cp');shake=6;LV.pops.push({x:cx*TS+8,y:cy*TS-6,txt:'GATE OPEN!',life:70,col:'#aaffc0'})}
const _updTongue=updTongue;
updTongue=function(){_updTongue();const t=P&&P.tongue;if(!t||t.held)return;const [mx,my]=mouth();
 for(let d=-14;d<=t.len;d+=4){const cx=Math.floor((mx+t.dx*d)/TS),cy=Math.floor((my+t.dy*d)/TS);if(T(cx,cy)==='K'){openGate(cx,cy);t.out=false;return}if(d>0&&SOLID.has(T(cx,cy)))return}};

// ---- Cackles the Hyena King (harder than Rhino Rumble: 8 hits, faster, throws bones) ----
const _updBoss=updBoss;
updBoss=function(){if(LV.boss&&LV.boss.kind==='king')return updKing();return _updBoss()};
function updKing(){const B=LV.boss,p=P,ax=B.ax;B.t++;if(B.flash>0)B.flash--;const ph2=B.hp<=B.max/2;
 const cg=LV.cage;
 if(B.st==='wait'){if(p.x>ax+3*TS&&p.st!=='dead'){for(let r=0;r<12;r++)LV.g[r][LV.arenaCol]='=';LV.cp={x:ax+3*TS,y:12*TS-24};B.arena=true;B.st='intro';B.t=0;AU.sfx('roar');
   LV.pops.push({x:ax+15*TS,y:5*TS,txt:'HEE HEE HEE! PETER IS MINE!',life:110,col:'#ffb0d0'})}return}
 // bones
 for(const o of LV.bones){o.vy+=0.2;o.x+=o.vx;o.y+=o.vy;o.r+=0.3;if(solidAt(o.x,o.y)||o.y>LPX){o.dead=true;burst(o.x,o.y,'#f4ead0',3,1)}
  else if(ov(p,{x:o.x-4,y:o.y-4,w:8,h:8})){if(p.st==='ram'){o.dead=true;addScore(50,o.x,o.y)}else{hurt();o.dead=true}}}
 LV.bones=LV.bones.filter(o=>!o.dead);
 // cage + Peter
 if(cg.st==='fall'){cg.vy=Math.min(cg.vy+0.3,7);cg.y+=cg.vy;if(cg.y+cg.h>=12*TS){cg.y=12*TS-cg.h;cg.st='land';cg.t=0;shake=8;AU.sfx('bonk')}}
 else if(cg.st==='land'){if(++cg.t>30){cg.st='open';cg.t=0;AU.sfx('oneup');burst(cg.x+12,cg.y+10,'#ffe14a',20,2.5);LV.pops.push({x:cg.x+12,y:cg.y-10,txt:'THANK YOU!',life:120,col:'#ffe14a'})}}
 else if(cg.st==='open'){cg.t++;if(p.st!=='dead'&&ov(p,{x:cg.x-4,y:cg.y,w:cg.w+8,h:cg.h})){levelClear()}}
 if(B.st==='gone')return;
 if(B.st==='dead'){B.vx*=0.9;B.vy=Math.min(B.vy+0.4,8);moveX(B,B.vx);const hy=moveY(B,B.vy);if(hy.length)B.vy=0;
  if(B.t===50){cg.st='fall';AU.sfx('break')}if(B.t>80){B.st='gone';burst(B.x+20,B.y+15,'#fff',24,3);AU.sfx('boom')}return}
 B.vy=Math.min(B.vy+(B.st==='hop'?0.32:0.4),8);
 const hx=moveX(B,B.vx),hy=moveY(B,B.vy);const landed=hy.length&&B.vy>0;if(hy.length)B.vy=0;B.ground=landed;
 const throwBone=()=>{const dx=(p.x+p.w/2)-(B.x+B.w/2);LV.bones.push({x:B.x+B.w/2,y:B.y+4,vx:clamp(dx/55,-3.2,3.2),vy:-5.2,r:0});AU.sfx('tongue')};
 if(B.st==='intro'){if(B.t>100){B.st='idle';B.t=0}}
 else if(B.st==='idle'){B.vx*=0.8;B.face=(p.x>B.x+B.w/2)?1:-1;if(B.t===14||(ph2&&B.t===30))throwBone();if(B.t>(ph2?40:52)){B.st='charge';B.t=0;AU.sfx('roar')}}
 else if(B.st==='charge'){const sp=ph2?3.9:3.1;B.vx=B.t<16?B.face*sp*B.t/16:B.face*sp;if(B.t%6===0)burst(B.x+B.w/2-B.face*18,B.y+B.h,'#9a8a7a',2,1);
  if(hx.length){B.st='stun';B.t=0;B.vx=-B.face*1.2;B.vy=-3;shake=12;AU.sfx('boom');
   const n=ph2?6:4;for(let i=0;i<n;i++)LV.rocks.push({x:rnd(ax+2*TS,ax+27*TS),y:-20-i*26,vy:0,w:12,h:12,warn:44+i*10})}}
 else if(B.st==='stun'){B.vx*=0.85;if(B.t>(ph2?105:135)){B.st='hop';B.t=0;B.vy=ph2?-9.2:-7.5;const dx=p.x-(B.x+B.w/2);B.vx=clamp(dx/50,-2.8,2.8);B.face=Math.sign(B.vx)||B.face}}
 else if(B.st==='hurt'){B.vx*=0.9;if(B.t>32){B.st='hop';B.t=0;B.vy=ph2?-9.2:-7.5;B.vx=(B.x>ax+15*TS?-1:1)*2.4;B.face=Math.sign(B.vx)}}
 else if(B.st==='hop'){if(landed&&B.t>5){B.st='idle';B.t=0;B.vx=0;shake=Math.max(shake,ph2?8:5);AU.sfx('bonk')}}
 for(const r of LV.rocks){if(r.warn>0){r.warn--;continue}r.vy=Math.min(r.vy+0.3,6);r.y+=r.vy;
  if(solidAt(r.x+6,r.y+12)){r.dead=true;burst(r.x+6,r.y+10,'#9b8a7a',6,2)}
  else if(ov(p,r)){if(p.st==='ram'){addScore(50,r.x,r.y);r.dead=true}else{hurt();r.dead=true}}}
 LV.rocks=LV.rocks.filter(r=>!r.dead);
 if(p.st==='dead'||p.st==='win'||B.st==='intro'||!ov(p,B))return;
 const stunned=B.st==='stun',stomp=p.vy>0.3&&p.y+p.h-p.vy<=B.y+10;
 if(stunned&&(p.st==='ram'||stomp)){B.hp--;B.flash=40;B.st='hurt';B.t=0;shake=10;AU.sfx('boom');addScore(1000,B.x+B.w/2,B.y-6,'+1000','#ffd34a');
  if(p.st==='ram'){p.st='n';p.ram=null;p.ramCD=10}p.vy=-6;p.vx=(p.x<B.x+B.w/2?-1:1)*2.4;p.airRam=true;p.inv=Math.max(p.inv,30);
  if(B.hp===B.max/2){LV.items.push({t:'L',x:ax+5.5*TS,y:7*TS,alive:true},{t:'L',x:ax+23.5*TS,y:7*TS,alive:true});LV.pops.push({x:B.x+20,y:B.y-20,txt:'CACKLES IS FURIOUS!',life:80,col:'#ff8a5a'})}
  if(B.hp<=0){B.st='dead';B.t=0;B.vy=-5;B.vx=0;addScore(8000,B.x+B.w/2,B.y-14,'+8000','#ffd34a');LV.rocks=[];LV.bones=[]}}
 else if(p.st==='ram'){p.st='n';p.ram=null;p.ramCD=14;p.vx=(p.x<B.x+B.w/2?-1:1)*3;p.vy=-3.5;p.inv=Math.max(p.inv,24);AU.sfx('bonk');LV.pops.push({x:B.x+B.w/2,y:B.y-8,txt:'NOT YET! WAIT TILL HE\'S DIZZY',life:70,col:'#fff'})}
 else if(!stunned)hurt()}

// ---- drawing ----
const _drawBoss=drawBoss;
drawBoss=function(B){if(B.kind!=='king')return _drawBoss(B);
 const cg=LV.cage;if(cg){const x=Math.round(cg.x-cam.x),y=Math.round(cg.y-cam.y);
  if(cg.st==='hang'){b.fillStyle='#777';for(let yy=0;yy<y;yy+=4)b.fillRect(x+11,yy,2,3)}
  const open=cg.st==='open',py=y+cg.h-1;drawPeterMini(b,x+12,py,{wave:open||((frame>>5)%2===0)});
  if(!open){b.fillStyle='#3a3a44';b.fillRect(x,y,cg.w,3);b.fillRect(x,y+cg.h-3,cg.w,3);b.fillStyle='#a0a6b0';for(let i=0;i<=cg.w;i+=5)b.fillRect(x+Math.min(i,cg.w-2),y,2,cg.h)}
  else{b.fillStyle='#a0a6b0';b.fillRect(x-6,y+cg.h-3,cg.w+12,3);b.fillStyle='#ff4f6e';const hy=y-8-((frame>>2)%10);b.fillRect(x+10,hy,2,2);b.fillRect(x+13,hy,2,2);b.fillRect(x+10,hy+2,5,2);b.fillRect(x+11,hy+4,3,1)}
  if(cg.st==='hang'&&(frame>>4)%3===0){b.fillStyle='#fff';b.font='bold 8px sans-serif';b.textAlign='center';b.fillText('HELP!',x+12,y-3)}}
 for(const o of LV.bones){const x=o.x-cam.x,y=o.y-cam.y;b.save();b.translate(x,y);b.rotate(o.r);b.fillStyle='#f4ead0';b.fillRect(-4,-1,8,2);b.fillRect(-5,-2,2,4);b.fillRect(3,-2,2,4);b.restore()}
 if(B.st==='gone'||B.st==='wait'&&B.x-cam.x>BW+40)return;
 const x=Math.round(B.x-cam.x),y=Math.round(B.y-cam.y),f=B.face;if(B.flash&&(B.flash>>2)%2)return;
 const R=(ox,oy,w,h,c)=>{b.fillStyle=c;b.fillRect(f>0?x+ox:x+40-ox-w,y+oy,w,h)};const l=B.st==='charge'?(B.t>>2)%2:0,dz=B.st==='stun'||B.st==='dead';
 R(3,9,28,13,'#b59a6a');R(5,9,24,2,'#c9b080');R(8,12,4,3,'#5a4430');R(16,14,4,3,'#5a4430');R(23,11,3,3,'#5a4430');R(12,18,3,2,'#5a4430');
 R(4,4,16,8,'#3a2a20');R(0,10,4,3,'#5a4430');
 R(26,3,13,12,'#b59a6a');R(36,9,4,5,'#3a2a20');R(28,0,3,4,'#5a4430');R(33,0,3,4,'#5a4430');R(30,6,3,2,dz?'#fff':'#ff3030');R(34,13,6,2,'#fff');R(35,12,1,1,'#3a2a20');R(37,12,1,1,'#3a2a20');
 R(27,-5,11,5,'#f2c230');R(27,-7,2,2,'#f2c230');R(31,-8,2,3,'#f2c230');R(35,-7,2,2,'#f2c230');R(31,-4,2,2,'#e8402a');
 R(5,22,4,8-l*2,'#8a7450');R(12,22,4,6+l*2,'#8a7450');R(21,22,4,8-l*2,'#8a7450');R(28,22,4,6+l*2,'#8a7450');
 if(dz){b.fillStyle='#fff36a';for(let i=0;i<4;i++){const a=frame*0.12+i*1.57;b.fillRect(Math.round(x+20+Math.cos(a)*14),Math.round(y-10+Math.sin(a)*3),3,3)}}};
const _drawTile=drawTile;
drawTile=function(t,x,y,cx,cy,th){
 if(t==='X'){b.fillStyle='#3a2616';b.fillRect(x,y,TS,TS);b.fillStyle='#8f96a2';for(let i=1;i<TS;i+=5)b.fillRect(x+i,y,2,TS);b.fillStyle='#5c6270';b.fillRect(x,y+6,TS,2);return}
 if(t==='K'||t==='k'){const on=t==='k';b.fillStyle='#5c6270';b.fillRect(x+4,y+9,8,5);b.fillStyle='#d0d4da';b.fillRect(x+7,on?y+11:y+2,2,on?2:8);b.fillRect(x+(on?9:7),on?y+10:y+1,on?6:2,on?2:2);
  b.fillStyle=on?'#2fd85a':'#e8402a';b.fillRect(x+(on?13:6),on?y+9:y,4,4);if(!on&&(frame>>4)%2){b.fillStyle='#fff6a0';b.fillRect(x+1,y+1,2,2)}return}
 _drawTile(t,x,y,cx,cy,th)};
const _drawBG=drawBG;
drawBG=function(th,cx,cy){_drawBG(th,cx,cy);if(th<5)return;const base=LPX-cy;
 if(th===5){b.fillStyle='#fff';for(let i=0;i<40;i++){const x=((hash(i,1)*BW*1.4-cx*0.02)%BW+BW)%BW,y=hash(i,2)*(base-140);if(y>0)b.fillRect(x|0,y|0,1,1)}}
 else{b.fillStyle='#1e1026';const off=-(cx*0.3)%220;for(let k=-1;k<BW/220+2;k++){const x=k*220+off;b.fillRect(x+20,base-130,120,90);for(let i=0;i<7;i++)b.fillRect(x+20+i*18,base-138,10,8);b.fillRect(x+60,base-170,34,40);for(let i=0;i<3;i++)b.fillRect(x+60+i*13,base-178,8,8);
   b.fillStyle='#ffcf6a';b.fillRect(x+74,base-160,6,8);b.fillRect(x+40,base-110,5,7);b.fillRect(x+110,base-112,5,7);b.fillStyle='#1e1026'}}};

// ---- clear / win / saved / levels / intro screens ----
levelClear=function(){if(state!=='play')return;const p=P;p.st='win';p.vx=0;p.tongue=null;stateT=0;AU.music(false);AU.sfx('clear');
 const bonus=G.hp*500;G.score+=bonus;G.lastBonus=bonus;
 if(G.lvl<MAIN_LAST){save.reached=Math.max(save.reached,G.lvl+1);state='clear'}
 else if(G.lvl===MAIN_LAST){save.reached=MAIN_LAST;G.newBonus=!save.bonus;save.bonus=true;save.bonusReached=Math.max(save.bonusReached||0,5);state='win'}
 else if(G.lvl===5){save.bonusReached=Math.max(save.bonusReached||0,6);state='clear'}
 else{save.peterSaved=true;state='saved'}
 save.best=Math.max(save.best,G.score);persist()};
function lvlTag(i){const L=LEVELS[i];return L.bonus?'BONUS '+L.bonus:(L.boss?'BOSS':'LEVEL '+(i+1))}
function startBonus(i){AU.sfx('sel');if(!G)G={score:0,lives:3,gems:0,lvl:i,hp:3,startScore:0};G.lives=Math.max(G.lives,3);startLevel(i)}
drawClear=function(){const w=Math.min(W-40,360),pnl=panel(w,300);txt(LEVELS[G.lvl].bonus?'BONUS CLEAR!':'LEVEL CLEAR!',W/2,pnl.y+36,28,'#ffd34a');
 txt('Gems: '+LV.gemGot+' / '+LV.gemTotal,W/2,pnl.y+84,18,'#c8ffd0');txt('Heart bonus: +'+(G.lastBonus||0),W/2,pnl.y+114,16,'#fff');txt('Score: '+G.score,W/2,pnl.y+144,18,'#ffe9a8');
 const nx=LEVELS[G.lvl+1],lab=nx.bonus===2?'TO THE FORTRESS ▶':nx.boss?'BOSS FIGHT ▶':'NEXT LEVEL ▶';
 if(stateT>40)button(pnl.x+20,pnl.y+300-74,w-40,56,lab,'#1f9d55',()=>{AU.sfx('sel');startLevel(G.lvl+1)})};
drawWin=function(){ctx.fillStyle='rgba(0,0,0,.45)';ctx.fillRect(0,0,W,H);const w=Math.min(W-30,420),h=Math.min(H-20,392),pnl=panel(w,h),sm=h<380;
 let y=pnl.y+(sm?28:36);txt('YOU WIN!',W/2,y,sm?26:32,'#ffd34a');y+=sm?30:38;
 const lines=wrap("Rhino Rumble is beaten and the green gems are back! Kelly's giraffe saved the Savanna!",w-40,15);lines.forEach((l,i)=>txt(l,W/2,y+i*19,15,'#fff','center',false));y+=lines.length*19+8;
 txt('Gems: '+G.gems+'   Score: '+G.score,W/2,y,16,'#c8ffd0');y+=sm?28:34;
 txt('★ BONUS ROUNDS UNLOCKED! ★',W/2,y,(frame>>4)%2?21:20,'#ff9de0');y+=sm?22:26;
 txt('But wait... Peter has been captured! Can she save him?',W/2,y,13,'#ffe9a8','center',false);
 if(stateT>60){const bw=(w-52)/2;button(pnl.x+18,pnl.y+h-68,bw,54,'⌂ TITLE','#4a3f8a',()=>{AU.sfx('sel');toTitle()},17);
  button(pnl.x+34+bw,pnl.y+h-68,bw,54,'BONUS ROUND ▶','#c2412d',()=>startBonus(5),17)}};
function drawSaved(){ctx.fillStyle='rgba(10,5,20,.55)';ctx.fillRect(0,0,W,H);const w=Math.min(W-24,460),h=Math.min(H-20,420),pnl=panel(w,h);
 const sm=h<400;let y=pnl.y+(sm?26:34);txt('PETER IS SAVED!',W/2,y,Math.min(32,w/11),'#ffd34a');
 const ih=sm?Math.min(118,h-200):150,cy=y+18+ih;// characters standing on this line
 const g=document.createElement('canvas');g.width=g.height=48;const q=g.getContext('2d');drawGiraffe(q,22,47,1,{hx:9,hy:-27,walk:0,blush:1});
 ctx.save();ctx.imageSmoothingEnabled=false;const gs=ih/48*1.05;ctx.drawImage(g,W/2-gs*44,cy-48*gs,48*gs,48*gs);ctx.restore();
 drawPeterPortrait(ctx,W/2+ih*0.42,cy,ih*0.8,frame/60);
 for(let i=0;i<5;i++){const a=frame*0.03+i*1.3;txt('♥',W/2+Math.cos(a)*ih*0.55,cy-ih*0.9+Math.sin(a*1.4)*12,14+((i+frame>>4)%2)*3,'#ff6b8a')}
 y=cy+22;const lines=wrap("She did it! Kelly's giraffe beat Cackles the Hyena King and set Peter free. Peter says: THANK YOU!",w-36,15);lines.forEach((l,i)=>txt(l,W/2,y+i*19,15,'#fff','center',false));y+=lines.length*19+4;
 txt('Score: '+G.score,W/2,y+4,16,'#ffe9a8');
 if(stateT>60){const bw=(w-52)/2;button(pnl.x+18,pnl.y+h-64,bw,52,'⌂ TITLE','#4a3f8a',()=>{AU.sfx('sel');toTitle()},17);button(pnl.x+34+bw,pnl.y+h-64,bw,52,'↻ PLAY AGAIN','#1f9d55',()=>{AU.sfx('sel');newGame(0)},17)}}
drawLevels=function(){const n=LEVELS.length,w=Math.min(W-24,portrait?420:720),cols=portrait||H>=600?1:2,rows=Math.ceil(n/cols),
  rh=clamp((Math.min(H-24,90+rows*58+70)-140)/rows,44,58),h=Math.min(H-16,rows*rh+140),pnl=panel(w,h);txt('Pick a level',W/2,pnl.y+28,22,'#f4c060');
 const cw=(w-32-(cols-1)*12)/cols;
 LEVELS.forEach((L,i)=>{const c=cols===2?(i<rows?0:1):0,r=cols===2?i%rows:i,x=pnl.x+16+c*(cw+12),y=pnl.y+54+r*rh,bh=rh-8;
  let ok,why='';if(i<=MAIN_LAST)ok=i<=save.reached;else if(i===5){ok=!!save.bonus;why='Beat the game to unlock'}else{ok=!!save.bonus&&(save.bonusReached||0)>=6;why=save.bonus?'Clear Bonus 1 to unlock':'Beat the game to unlock'}
  const label=(L.bonus?'★ Bonus '+L.bonus+': ':(i+1)+'. ')+L.name;
  if(ok)button(x,y,cw,bh,label,L.bonus?'#8a2fa8':L.boss?'#c2412d':'#2a6a4a',()=>{L.bonus?(G=null,startBonus(i)):(AU.sfx('sel'),newGame(i))},Math.min(17,bh*0.38));
  else{rrect(x,y,cw,bh,12,'rgba(255,255,255,.08)','rgba(255,255,255,.25)',2);menuBtns.push({x,y,w:cw,h:bh,fn:null,label:'LOCKED '+label});
   if(L.bonus){txt('🔒 '+label,x+cw/2,y+bh*0.33,Math.min(15,bh*0.3),'rgba(255,255,255,.6)');txt(why,x+cw/2,y+bh*0.72,Math.min(13,bh*0.27),'#ff9de0')}
   else txt((i+1)+'. ???',x+cw/2,y+bh/2,16,'rgba(255,255,255,.4)')}});
 button(pnl.x+16,pnl.y+h-58,w-32,46,'◀ BACK','#4a3f8a',()=>{AU.sfx('sel');state='title'})};
const _drawIntro=drawIntro;
drawIntro=function(){const L=LEVELS[G.lvl];if(!L.bonus)return _drawIntro();const ga=gameArea();ctx.fillStyle='rgba(15,8,25,.72)';ctx.fillRect(0,0,W,ga);
 const ph=Math.min(110,ga*0.22);let y=Math.max(SAFE.t+70,ga*0.16);txt('BONUS '+L.bonus,W/2,y,24,'#ff9de0');txt(L.name,W/2,y+34,Math.min(32,W/12),'#fff');
 const py=y+50+ph;rrect(W/2-ph*0.62,y+50,ph*1.24,ph+6,12,'#7cc8fc','#fff',3);drawPeterPortrait(ctx,W/2,py+4,ph*0.95,frame/60);txt(L.bonus===1?'HELP!':'SAVE ME!',W/2+ph*0.55,y+56,16,'#ffe14a');
 const s=L.bonus===1?"Oh no! Cackles the Hyena King captured Peter! She must ram, grab, swing and slurp her way to the Hyena Fortress!":"Peter is locked in a cage at the top of the fortress. She has to beat Cackles (8 hits!) to set him free!";
 wrap(s,Math.min(W-40,440),15).forEach((l,i)=>txt(l,W/2,py+28+i*20,15,'#fff','center',false));txt('tap to start',W/2,Math.min(ga-16,py+100),14,'rgba(255,255,255,.7)')};
const _drawTitle=drawTitle;
drawTitle=function(){_drawTitle();if(title.cover||!save.bonus||state!=='title')return;const ty=SAFE.t+Math.max(40,H*0.1),fs=Math.min(46,W/9);
 txt(save.peterSaved?'★ Peter is saved! ★':'★ Bonus rounds unlocked: save Peter! ★',W/2,ty+fs*1.7+20,14,'#ff9de0')};
const _render=render;
render=function(){if(state!=='saved')return _render();menuBtns=[];ctx.setTransform(1,0,0,1,0,0);ctx.imageSmoothingEnabled=false;b.setTransform(1,0,0,1,0,0);drawWorld();
 ctx.drawImage(buf,0,0,BW,BH,0,0,Math.round(BW*S*DPR),Math.round(BH*S*DPR));ctx.setTransform(DPR,0,0,DPR,0,0);drawSaved()};
window.__kga.save=save;window.__kga.levelClear=()=>levelClear();
