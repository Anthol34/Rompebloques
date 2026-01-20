import React, { useRef, useEffect, useState } from 'react';
import './BreakoutGame.css';

const C = { rad: 10, padH: 12, padW: 80, rows: 4, cols: 7, brW: 75, brH: 24, gap: 10, speed: 2.5 };

export default function BreakoutGame() {
  const canvasRef = useRef(null);
  const [view, setView] = useState('MENU'); // MENU, PLAYING, WON, GAMEOVER, INSTRUCTIONS, RECORD
  const [score, setScore] = useState(0);
  const [name, setName] = useState('');
  const [records, setRecs] = useState(JSON.parse(localStorage.getItem('scores')) || []);

  const save = () => {
    if (!name.trim()) return;
    const newRecs = [...records, { name: name.toUpperCase(), score }].sort((a,b)=>b.score-a.score).slice(0,5);
    setRecs(newRecs); localStorage.setItem('scores', JSON.stringify(newRecs));
    setView('MENU'); setName('');
  };

  useEffect(() => {
    if (view !== 'PLAYING') return;
    const cvs = canvasRef.current, ctx = cvs.getContext('2d');
    let { width: W, height: H } = cvs;
    let x = W/2, y = H-30, dx = C.speed, dy = -C.speed, pX = (W-C.padW)/2, keys = {};
    let bricks = Array(C.cols).fill().map((_, c) => Array(C.rows).fill().map((_, r) => ({ x: c*(C.brW+C.gap)+35, y: r*(C.brH+C.gap)+40, s: 1 })));
    let curScore = 0, aniId;

    const evs = { keydown: e => keys[e.key] = true, keyup: e => keys[e.key] = false, mousemove: e => pX = e.clientX - cvs.getBoundingClientRect().left - C.padW/2 };
    Object.entries(evs).forEach(([k, v]) => document.addEventListener(k, v));

    const loop = () => {
      ctx.clearRect(0,0,W,H);
      // Ladrillos y Colisiones
      bricks.flat().forEach(b => {
        if (!b.s) return;
        ctx.fillStyle = '#6600cc'; ctx.beginPath(); ctx.roundRect(b.x, b.y, C.brW, C.brH, 4); ctx.fill();
        if (x > b.x && x < b.x+C.brW && y > b.y && y < b.y+C.brH) { dy = -dy; b.s = 0; setScore(++curScore); }
      });
      if (curScore === C.cols*C.rows) return setView('WON');

      // Pelota y Paleta
      ctx.fillStyle = '#adff2f'; ctx.beginPath(); ctx.arc(x,y,C.rad,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.roundRect(pX, H-C.padH, C.padW, C.padH, 5); ctx.fill();

      // Físicas
      if (x+dx > W-C.rad || x+dx < C.rad) dx = -dx;
      if (y+dy < C.rad) dy = -dy;
      else if (y+dy > H-C.rad) {
         if (x > pX && x < pX+C.padW) dy = -dy;
         else return setView((records[4]?.score || 0) < curScore || records.length < 5 ? 'RECORD' : 'GAMEOVER');
      }
      
      if ((keys.ArrowRight || keys.Right) && pX < W-C.padW) pX += 7;
      if ((keys.ArrowLeft || keys.Left) && pX > 0) pX -= 7;
      x += dx; y += dy;
      aniId = requestAnimationFrame(loop);
    };
    loop();
    return () => { cancelAnimationFrame(aniId); Object.keys(evs).forEach(k => document.removeEventListener(k, evs[k])); };
  }, [view]);

  return (
    <div className="game-container">
      <h2>Puntuación: {score}</h2>
      <div style={{position: 'relative'}}>
        <canvas ref={canvasRef} width="650" height="450" />
        {view !== 'PLAYING' && <div className="overlay">
          {view === 'MENU' ? <>
            <h1>ROMPEBLOQUES</h1>
            <button className="btn-primary" onClick={() => {setScore(0); setView('PLAYING')}}>JUGAR</button>
            <button className="btn-secondary" onClick={() => setView('INSTRUCTIONS')}>AYUDA</button>
            <div className="high-scores"><table><tbody>{records.length ? records.map((r,i)=><tr key={i}><td>#{i+1}</td><td>{r.name}</td><td>{r.score}</td></tr>) : <tr><td>Sin récords</td></tr>}</tbody></table></div>
          </> : view === 'INSTRUCTIONS' ? <>
             <h2>INSTRUCCIONES</h2><div className="instructions-box"><p>🖱️ Mouse / ⌨️ Flechas</p><p>Rompe todos los ladrillos.</p></div>
             <button className="btn-secondary" onClick={()=>setView('MENU')}>VOLVER</button>
          </> : view === 'RECORD' ? <>
             <h1 style={{color:'#adff2f'}}>¡NUEVO RÉCORD!</h1>
             <input className="input-name" value={name} onChange={e=>setName(e.target.value)} placeholder="TU NOMBRE" maxLength={10}/>
             <button className="btn-primary" onClick={save}>GUARDAR</button>
          </> : <>
             <h1 style={{color: view==='WON'?'#adff2f':'#ff4d4d'}}>{view==='WON'?'¡GANASTE!':'GAME OVER'}</h1>
             <button className="btn-primary" onClick={()=>{setScore(0); setView('PLAYING')}}>REINTENTAR</button>
             <button className="btn-secondary" onClick={()=>setView('MENU')}>MENÚ</button>
          </>}
        </div>}
      </div>
    </div>
  );
}