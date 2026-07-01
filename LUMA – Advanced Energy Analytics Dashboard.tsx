import { useState } from "react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line
} from "recharts";

const COLORS = {
  bg: "#080c1a", card: "rgba(255,255,255,0.04)", border: "rgba(255,255,255,0.07)",
  purple: "#7c3aed", indigo: "#6366f1", cyan: "#06b6d4",
  amber: "#f59e0b", green: "#10b981", red: "#ef4444", pink: "#ec4899",
};

const weekData = [
  { t:"Mon", kwh:8.2, cost:0.98, forecast:9 },
  { t:"Tue", kwh:11.5, cost:1.38, forecast:11 },
  { t:"Wed", kwh:9.8, cost:1.18, forecast:10 },
  { t:"Thu", kwh:13.2, cost:1.58, forecast:13 },
  { t:"Fri", kwh:10.5, cost:1.26, forecast:11 },
  { t:"Sat", kwh:16.8, cost:2.02, forecast:16 },
  { t:"Sun", kwh:11.1, cost:1.33, forecast:12 },
];
const monthData = [
  { t:"W1", kwh:58, cost:6.96, forecast:60 },
  { t:"W2", kwh:72, cost:8.64, forecast:70 },
  { t:"W3", kwh:63, cost:7.56, forecast:65 },
  { t:"W4", kwh:81, cost:9.72, forecast:80 },
];
const todayData = [
  { t:"6AM",kwh:0.8,cost:0.10 },{ t:"8AM",kwh:2.1,cost:0.25 },
  { t:"10AM",kwh:1.4,cost:0.17 },{ t:"12PM",kwh:3.2,cost:0.38 },
  { t:"2PM",kwh:2.8,cost:0.34 },{ t:"4PM",kwh:2.6,cost:0.31 },
  { t:"6PM",kwh:4.5,cost:0.54 },{ t:"8PM",kwh:5.1,cost:0.61 },
  { t:"10PM",kwh:3.0,cost:0.36 },
];
const hourlyWatts = [
  { h:"6AM",w:45 },{ h:"8AM",w:120 },{ h:"10AM",w:85 },
  { h:"12PM",w:200 },{ h:"2PM",w:175 },{ h:"4PM",w:160 },
  { h:"6PM",w:280 },{ h:"8PM",w:320 },{ h:"10PM",w:190 },
];
const lampData = [
  { name:"Living Room Main", room:"Living Room", kwh:14.2, cost:1.70, v:230, mA:39, w:9, eff:88, on:true },
  { name:"Bedroom Ceiling",  room:"Bedroom",     kwh:8.1,  cost:0.97, v:230, mA:0,  w:0, eff:92, on:true },
  { name:"Kitchen Downlight",room:"Kitchen",     kwh:11.4, cost:1.37, v:230, mA:26, w:6, eff:95, on:true },
  { name:"Front Porch",      room:"Entrance",    kwh:6.2,  cost:0.74, v:0,   mA:0,  w:0, eff:78, on:false },
  { name:"Study Desk Lamp",  room:"Study",       kwh:19.8, cost:2.38, v:230, mA:52, w:12,eff:85, on:true },
  { name:"Garage Floodlight",room:"Garage",      kwh:3.1,  cost:0.37, v:230, mA:0,  w:0, eff:90, on:true },
];
const distData = [
  { name:"Study",       val:19.8, color:"#06b6d4" },
  { name:"Living Rm",   val:14.2, color:"#7c3aed" },
  { name:"Kitchen",     val:11.4, color:"#f59e0b" },
  { name:"Bedroom",     val:8.1,  color:"#10b981" },
  { name:"Entrance",    val:6.2,  color:"#ef4444" },
  { name:"Garage",      val:3.1,  color:"#8b5cf6" },
];
const total = distData.reduce((s,d)=>s+d.val,0);

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background:"#1a1f35", border:"1px solid rgba(124,58,237,0.4)", borderRadius:10, padding:"8px 12px", fontSize:11 }}>
      <div style={{ color:"#a78bfa", fontWeight:700, marginBottom:4 }}>{label}</div>
      {payload.map((p,i) => (
        <div key={i} style={{ color:p.color, marginBottom:2 }}>
          {p.name}: <b>{p.value}</b>
        </div>
      ))}
    </div>
  );
};

export default function EnergyDashboard() {
  const [period, setPeriod] = useState("week");
  const [sortKey, setSortKey] = useState("kwh");
  const [tab, setTab] = useState("overview");

  const chartData = period === "today" ? todayData : period === "week" ? weekData : monthData;
  const sorted = [...lampData].sort((a,b) => b[sortKey] - a[sortKey]);

  const kpis = [
    { label:"Today",     val:"3.1 kWh", sub:"$0.37",   icon:"⚡", color:COLORS.amber,  trend:"+4%", up:true },
    { label:"This Month",val:"63 kWh",  sub:"$7.53",   icon:"📅", color:COLORS.indigo, trend:"+12%",up:true },
    { label:"Avg Daily", val:"2.1 kWh", sub:"per day", icon:"📊", color:COLORS.cyan,   trend:"-3%", up:false },
    { label:"Peak Power",val:"47 W",    sub:"8:42 PM", icon:"🔥", color:COLORS.red,    trend:null,  up:null },
  ];

  return (
    <div style={{
      background:`linear-gradient(160deg,#080c1a 0%,#0e1230 50%,#080c1a 100%)`,
      minHeight:"100vh", color:"white",
      fontFamily:"'Inter',system-ui,sans-serif",
      maxWidth:430, margin:"0 auto",
      overflowX:"hidden", position:"relative",
    }}>

      {/* Ambient glow top */}
      <div style={{
        position:"absolute",top:-60,left:"30%",width:200,height:200,
        background:"radial-gradient(circle,rgba(124,58,237,0.25) 0%,transparent 70%)",
        pointerEvents:"none",
      }}/>

      {/* ── HEADER ── */}
      <div style={{ padding:"22px 20px 0", display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
        <div>
          <div style={{ fontSize:11, color:"#6b7280", fontWeight:600, textTransform:"uppercase", letterSpacing:1 }}>LUMA Smart Home</div>
          <h1 style={{
            fontSize:26, fontWeight:800, margin:"2px 0 0",
            background:"linear-gradient(90deg,#fff 30%,#a78bfa)",
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
          }}>Energy Analytics</h1>
          <div style={{ fontSize:11, color:"#4b5563", marginTop:2 }}>June 2026 · 6 lamps active</div>
        </div>
        <div style={{ position:"relative", marginTop:4 }}>
          <div style={{
            width:42, height:42, borderRadius:13,
            background:"rgba(124,58,237,0.15)",
            border:"1px solid rgba(124,58,237,0.35)",
            display:"flex",alignItems:"center",justifyContent:"center",
            cursor:"pointer", fontSize:18,
          }}>🔔</div>
          <div style={{ position:"absolute",top:-3,right:-3,width:11,height:11,borderRadius:"50%",background:"#ef4444",border:"2px solid #080c1a" }}/>
        </div>
      </div>

      {/* ── PERIOD TABS ── */}
      <div style={{ padding:"14px 20px 0" }}>
        <div style={{ display:"flex", background:"rgba(255,255,255,0.05)", borderRadius:14, padding:4, gap:3 }}>
          {["today","week","month"].map(p => (
            <button key={p} onClick={()=>setPeriod(p)} style={{
              flex:1, padding:"9px 4px", borderRadius:10, border:"none", cursor:"pointer",
              fontSize:12, fontWeight:700, textTransform:"capitalize",
              background: period===p ? "linear-gradient(135deg,#7c3aed,#6366f1)" : "transparent",
              color: period===p ? "white" : "#6b7280",
              transition:"all 0.25s", boxShadow: period===p ? "0 4px 14px rgba(124,58,237,0.4)" : "none",
            }}>{p}</button>
          ))}
        </div>
      </div>

      {/* ── KPI CARDS ── */}
      <div style={{ padding:"14px 20px 0", display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
        {kpis.map((k,i) => (
          <div key={i} style={{
            background: i===0 ? "linear-gradient(135deg,rgba(245,158,11,0.15),rgba(245,158,11,0.05))"
                      : i===1 ? "linear-gradient(135deg,rgba(99,102,241,0.15),rgba(99,102,241,0.05))"
                      : COLORS.card,
            backdropFilter:"blur(12px)",
            border:`1px solid ${k.color}22`,
            borderRadius:18, padding:"14px 14px",
            position:"relative", overflow:"hidden",
          }}>
            <div style={{ position:"absolute",top:-20,right:-20,width:70,height:70,borderRadius:"50%",background:`radial-gradient(circle,${k.color}20,transparent 70%)` }}/>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
              <span style={{ fontSize:10, color:"#9ca3af", fontWeight:700, textTransform:"uppercase", letterSpacing:0.5 }}>{k.label}</span>
              <span style={{ fontSize:18 }}>{k.icon}</span>
            </div>
            <div style={{ fontSize:22, fontWeight:900, color:k.color, marginTop:8, lineHeight:1 }}>{k.val}</div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:5 }}>
              <span style={{ fontSize:11, color:"#6b7280" }}>{k.sub}</span>
              {k.trend && <span style={{ fontSize:10, fontWeight:700, color: k.up ? COLORS.green : COLORS.red }}>
                {k.up ? "▲" : "▼"} {k.trend}
              </span>}
            </div>
          </div>
        ))}
      </div>

      {/* ── SECTION TABS ── */}
      <div style={{ padding:"16px 20px 0", display:"flex", gap:8, overflowX:"auto" }}>
        {["overview","power curve","by lamp","insights"].map(t => (
          <button key={t} onClick={()=>setTab(t)} style={{
            flexShrink:0, padding:"7px 16px", borderRadius:30, border:"none", cursor:"pointer",
            fontSize:11, fontWeight:600, textTransform:"capitalize", whiteSpace:"nowrap",
            background: tab===t ? "linear-gradient(135deg,#7c3aed,#6366f1)" : "rgba(255,255,255,0.06)",
            color: tab===t ? "white" : "#6b7280",
            boxShadow: tab===t ? "0 4px 12px rgba(124,58,237,0.4)" : "none",
            transition:"all 0.2s",
          }}>{t}</button>
        ))}
      </div>

      {/* ══ OVERVIEW TAB ══ */}
      {tab === "overview" && <>

        {/* Consumption Area Chart */}
        <div style={{ padding:"14px 20px 0" }}>
          <div style={{ background:COLORS.card, backdropFilter:"blur(12px)", border:`1px solid ${COLORS.border}`, borderRadius:20, padding:16 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14 }}>
              <div>
                <div style={{ fontSize:14, fontWeight:700 }}>Consumption Trend</div>
                <div style={{ fontSize:11, color:"#6b7280", marginTop:1 }}>kWh · Actual vs Forecast</div>
              </div>
              <div style={{ display:"flex", gap:10 }}>
                {[{c:"#7c3aed",l:"kWh"},{c:"#f59e0b",l:"Forecast"}].map((x,i)=>(
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:4 }}>
                    <div style={{ width:20,height:3,borderRadius:2,background:x.c,opacity:i===1?0.6:1 }}/>
                    <span style={{ fontSize:10, color:"#9ca3af" }}>{x.l}</span>
                  </div>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={165}>
              <AreaChart data={chartData} margin={{ top:5, right:5, bottom:0, left:-22 }}>
                <defs>
                  <linearGradient id="gKwh" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#7c3aed" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="gFc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#f59e0b" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)"/>
                <XAxis dataKey="t" tick={{ fill:"#6b7280", fontSize:10 }} axisLine={false} tickLine={false}/>
                <YAxis tick={{ fill:"#6b7280", fontSize:10 }} axisLine={false} tickLine={false}/>
                <Tooltip content={<CustomTooltip/>}/>
                <Area type="monotone" dataKey="kwh" name="kWh" stroke="#7c3aed" strokeWidth={2.5} fill="url(#gKwh)" dot={{ fill:"#7c3aed", r:3, strokeWidth:0 }} activeDot={{ r:5 }}/>
                <Area type="monotone" dataKey="forecast" name="Forecast" stroke="#f59e0b" strokeWidth={1.5} strokeDasharray="4 3" fill="url(#gFc)"/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Live Status + Efficiency */}
        <div style={{ padding:"12px 20px 0", display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          {/* Live power */}
          <div style={{ background:COLORS.card, border:`1px solid ${COLORS.border}`, borderRadius:18, padding:14 }}>
            <div style={{ fontSize:10, color:"#9ca3af", fontWeight:700, textTransform:"uppercase", letterSpacing:0.5 }}>Live Power</div>
            <div style={{ display:"flex", alignItems:"center", gap:6, marginTop:6 }}>
              <div style={{ width:8,height:8,borderRadius:"50%",background:COLORS.green,boxShadow:`0 0 8px ${COLORS.green}` }}/>
              <span style={{ fontSize:10, color:COLORS.green, fontWeight:600 }}>5 lamps on</span>
            </div>
            <div style={{ fontSize:34, fontWeight:900, color:COLORS.amber, marginTop:8, lineHeight:1 }}>27<span style={{ fontSize:16, fontWeight:500 }}>W</span></div>
            <div style={{ fontSize:10, color:"#6b7280", marginTop:3 }}>of 47W peak</div>
            <div style={{ marginTop:10, background:"rgba(255,255,255,0.08)", borderRadius:4, height:5, overflow:"hidden" }}>
              <div style={{ width:"57%",height:"100%",borderRadius:4,background:`linear-gradient(90deg,${COLORS.green},${COLORS.amber})` }}/>
            </div>
            <div style={{ display:"flex",justifyContent:"space-between",marginTop:3 }}>
              <span style={{ fontSize:9,color:"#4b5563" }}>0W</span>
              <span style={{ fontSize:9,color:"#4b5563" }}>47W</span>
            </div>
          </div>

          {/* Efficiency */}
          <div style={{ background:COLORS.card, border:`1px solid ${COLORS.border}`, borderRadius:18, padding:14 }}>
            <div style={{ fontSize:10, color:"#9ca3af", fontWeight:700, textTransform:"uppercase", letterSpacing:0.5 }}>Efficiency</div>
            <div style={{ fontSize:34, fontWeight:900, color:COLORS.green, marginTop:14, lineHeight:1 }}>88<span style={{ fontSize:16, fontWeight:500 }}>%</span></div>
            <div style={{ fontSize:10, color:"#6b7280", marginTop:3 }}>system avg</div>
            {[["A+",COLORS.green,"4 lamps"],["A","#a78bfa","1 lamp"],["B+",COLORS.amber,"1 lamp"]].map(([g,c,n],i)=>(
              <div key={i} style={{ display:"flex",alignItems:"center",gap:5,marginTop:7 }}>
                <div style={{ width:18,height:14,borderRadius:4,background:`${c}30`,border:`1px solid ${c}60`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,color:c,fontWeight:800 }}>{g}</div>
                <div style={{ flex:1,height:4,borderRadius:2,background:`${c}25`,overflow:"hidden" }}>
                  <div style={{ width:i===0?"70%":i===1?"20%":"10%",height:"100%",background:c }}/>
                </div>
                <span style={{ fontSize:9,color:"#6b7280",minWidth:30 }}>{n}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Distribution Donut */}
        <div style={{ padding:"12px 20px 0" }}>
          <div style={{ background:COLORS.card, border:`1px solid ${COLORS.border}`, borderRadius:20, padding:16 }}>
            <div style={{ fontSize:14, fontWeight:700 }}>Energy Distribution</div>
            <div style={{ fontSize:11, color:"#6b7280", marginTop:1, marginBottom:10 }}>By room · This month</div>
            <div style={{ display:"flex", alignItems:"center" }}>
              <div style={{ flex:"0 0 140px" }}>
                <ResponsiveContainer width={140} height={140}>
                  <PieChart>
                    <Pie data={distData} cx="50%" cy="50%" innerRadius={38} outerRadius={60} paddingAngle={3} dataKey="val" startAngle={90} endAngle={-270}>
                      {distData.map((e,i) => <Cell key={i} fill={e.color} stroke="transparent"/>)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                {/* Center label */}
                <div style={{ textAlign:"center", marginTop:-10, fontSize:11, color:"#6b7280" }}>
                  <span style={{ fontSize:18, fontWeight:800, color:"white", display:"block" }}>{total.toFixed(1)}</span>kWh
                </div>
              </div>
              <div style={{ flex:1, paddingLeft:16 }}>
                {distData.map((d,i) => (
                  <div key={i} style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:7 }}>
                    <div style={{ display:"flex",alignItems:"center",gap:7 }}>
                      <div style={{ width:9,height:9,borderRadius:3,background:d.color }}/>
                      <span style={{ fontSize:11,color:"#d1d5db" }}>{d.name}</span>
                    </div>
                    <div style={{ textAlign:"right" }}>
                      <span style={{ fontSize:11,fontWeight:700,color:d.color }}>{d.val}</span>
                      <span style={{ fontSize:9,color:"#6b7280",marginLeft:4 }}>{((d.val/total)*100).toFixed(0)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Cost Forecast Banner */}
        <div style={{ padding:"12px 20px 0" }}>
          <div style={{
            background:"linear-gradient(135deg,rgba(124,58,237,0.22),rgba(6,182,212,0.12))",
            border:"1px solid rgba(124,58,237,0.35)",
            borderRadius:20, padding:18,
          }}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start" }}>
              <div>
                <div style={{ fontSize:10,color:"#a78bfa",fontWeight:700,textTransform:"uppercase",letterSpacing:0.8 }}>📈 Month Forecast</div>
                <div style={{ fontSize:32,fontWeight:900,color:"white",marginTop:4,lineHeight:1 }}>$11.20</div>
                <div style={{ fontSize:11,color:"#9ca3af",marginTop:3 }}>Projected end-of-month cost</div>
              </div>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontSize:10,color:"#6b7280" }}>vs last month</div>
                <div style={{ fontSize:22,fontWeight:900,color:COLORS.green,marginTop:4 }}>-8.3%</div>
                <div style={{ fontSize:10,color:COLORS.green,marginTop:2 }}>Saving ↓</div>
              </div>
            </div>
            <div style={{ marginTop:14, background:"rgba(255,255,255,0.12)", borderRadius:6, height:6, overflow:"hidden" }}>
              <div style={{ width:"67%",height:"100%",borderRadius:6,background:"linear-gradient(90deg,#7c3aed,#06b6d4)" }}/>
            </div>
            <div style={{ display:"flex",justifyContent:"space-between",marginTop:5 }}>
              <span style={{ fontSize:9,color:"#6b7280" }}>Jun 1</span>
              <span style={{ fontSize:9,color:"#a78bfa",fontWeight:700 }}>Day 23 / 30</span>
              <span style={{ fontSize:9,color:"#6b7280" }}>Jun 30</span>
            </div>
          </div>
        </div>
      </>}

      {/* ══ POWER CURVE TAB ══ */}
      {tab === "power curve" && <>
        <div style={{ padding:"14px 20px 0" }}>
          <div style={{ background:COLORS.card, border:`1px solid ${COLORS.border}`, borderRadius:20, padding:16 }}>
            <div style={{ fontSize:14, fontWeight:700 }}>Power Usage Curve</div>
            <div style={{ fontSize:11, color:"#6b7280", marginTop:1, marginBottom:14 }}>Watts · Today real-time</div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={hourlyWatts} margin={{ top:5, right:5, bottom:0, left:-22 }}>
                <defs>
                  <linearGradient id="barG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"  stopColor="#7c3aed" stopOpacity={1}/>
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.7}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)"/>
                <XAxis dataKey="h" tick={{ fill:"#6b7280",fontSize:9 }} axisLine={false} tickLine={false}/>
                <YAxis tick={{ fill:"#6b7280",fontSize:9 }} axisLine={false} tickLine={false}/>
                <Tooltip content={<CustomTooltip/>}/>
                <Bar dataKey="w" name="Watts" fill="url(#barG)" radius={[5,5,0,0]}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Peak Analysis */}
        <div style={{ padding:"12px 20px 0" }}>
          <div style={{ background:COLORS.card, border:`1px solid ${COLORS.border}`, borderRadius:20, padding:16 }}>
            <div style={{ fontSize:14, fontWeight:700, marginBottom:14 }}>Peak Analysis</div>
            {[
              { label:"Peak Hour",     val:"8 PM",    sub:"320 W avg", icon:"🔥", color:COLORS.red },
              { label:"Low Hour",      val:"6 AM",    sub:"45 W avg",  icon:"🌙", color:COLORS.cyan },
              { label:"Daily Average", val:"175 W",   sub:"across 9hr",icon:"📊", color:COLORS.purple },
              { label:"Load Factor",   val:"54.7%",   sub:"of rated",  icon:"⚡", color:COLORS.amber },
            ].map((s,i) => (
              <div key={i} style={{
                display:"flex", alignItems:"center", justifyContent:"space-between",
                padding:"11px 0", borderBottom: i<3 ? "1px solid rgba(255,255,255,0.05)" : "none"
              }}>
                <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <div style={{ width:38,height:38,borderRadius:12,background:`${s.color}18`,border:`1px solid ${s.color}30`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18 }}>{s.icon}</div>
                  <div>
                    <div style={{ fontSize:12,fontWeight:600 }}>{s.label}</div>
                    <div style={{ fontSize:10,color:"#6b7280",marginTop:1 }}>{s.sub}</div>
                  </div>
                </div>
                <div style={{ fontSize:18,fontWeight:800,color:s.color }}>{s.val}</div>
              </div>
            ))}
          </div>
        </div>

        {/* kWh Cost Line */}
        <div style={{ padding:"12px 20px 0" }}>
          <div style={{ background:COLORS.card, border:`1px solid ${COLORS.border}`, borderRadius:20, padding:16 }}>
            <div style={{ fontSize:14, fontWeight:700, marginBottom:4 }}>Cost vs Consumption</div>
            <div style={{ fontSize:11, color:"#6b7280", marginBottom:14 }}>Today · kWh vs $</div>
            <ResponsiveContainer width="100%" height={140}>
              <LineChart data={todayData} margin={{ top:5,right:5,bottom:0,left:-22 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)"/>
                <XAxis dataKey="t" tick={{ fill:"#6b7280",fontSize:9 }} axisLine={false} tickLine={false}/>
                <YAxis tick={{ fill:"#6b7280",fontSize:9 }} axisLine={false} tickLine={false}/>
                <Tooltip content={<CustomTooltip/>}/>
                <Line type="monotone" dataKey="kwh" name="kWh" stroke="#7c3aed" strokeWidth={2.5} dot={false} activeDot={{ r:4 }}/>
                <Line type="monotone" dataKey="cost" name="$" stroke="#f59e0b" strokeWidth={2} dot={false} activeDot={{ r:4 }} strokeDasharray="4 2"/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </>}

      {/* ══ BY LAMP TAB ══ */}
      {tab === "by lamp" && <>
        <div style={{ padding:"14px 20px 0" }}>
          <div style={{ background:COLORS.card, border:`1px solid ${COLORS.border}`, borderRadius:20, padding:16 }}>
            {/* Sort controls */}
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
              <div>
                <div style={{ fontSize:14, fontWeight:700 }}>Per Lamp Analytics</div>
                <div style={{ fontSize:11, color:"#6b7280", marginTop:1 }}>This month · 6 devices</div>
              </div>
              <div style={{ display:"flex", gap:5 }}>
                {["kwh","cost","eff"].map(k => (
                  <button key={k} onClick={()=>setSortKey(k)} style={{
                    padding:"4px 9px", borderRadius:8, border:"none", cursor:"pointer",
                    fontSize:10, fontWeight:700, textTransform:"uppercase",
                    background: sortKey===k ? "rgba(124,58,237,0.3)" : "rgba(255,255,255,0.06)",
                    color: sortKey===k ? "#a78bfa" : "#6b7280",
                  }}>{k}</button>
                ))}
              </div>
            </div>

            {/* Column headers */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 52px 48px 38px", gap:6, paddingBottom:8, borderBottom:"1px solid rgba(255,255,255,0.07)", marginBottom:4 }}>
              {["Lamp","kWh","Cost","Eff%"].map(h => (
                <div key={h} style={{ fontSize:9, color:"#6b7280", fontWeight:700, textTransform:"uppercase", letterSpacing:0.4 }}>{h}</div>
              ))}
            </div>

            {sorted.map((lp,i) => (
              <div key={i} style={{
                display:"grid", gridTemplateColumns:"1fr 52px 48px 38px", gap:6,
                padding:"10px 0", alignItems:"center",
                borderBottom: i<sorted.length-1 ? "1px solid rgba(255,255,255,0.04)" : "none",
              }}>
                <div>
                  <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                    <div style={{ width:7,height:7,borderRadius:"50%",flexShrink:0,
                      background: lp.on ? COLORS.green : COLORS.red,
                      boxShadow: lp.on ? `0 0 6px ${COLORS.green}` : "none",
                    }}/>
                    <span style={{ fontSize:12, fontWeight:600, color:"white" }}>{lp.name}</span>
                  </div>
                  <div style={{ display:"flex", gap:10, marginTop:4, marginLeft:13 }}>
                    {[{l:"V",v:lp.v},{l:"mA",v:lp.mA},{l:"W",v:lp.w}].map((x,j) => (
                      <span key={j} style={{ fontSize:9, color:"#4b5563" }}>
                        <span style={{ color: x.v===0?"#4b5563":"#6b7280", fontWeight:600 }}>{x.v}</span> {x.l}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize:13, fontWeight:800, color:COLORS.amber }}>{lp.kwh}</div>
                  <div style={{ marginTop:3, height:3, borderRadius:2, background:"rgba(255,255,255,0.08)", overflow:"hidden" }}>
                    <div style={{ width:`${(lp.kwh/19.8)*100}%`, height:"100%", background:COLORS.amber, opacity:0.7 }}/>
                  </div>
                </div>
                <div style={{ fontSize:13, fontWeight:800, color:COLORS.green }}>${lp.cost.toFixed(2)}</div>
                <div style={{
                  fontSize:12, fontWeight:800,
                  color: lp.eff>=90 ? COLORS.green : lp.eff>=85 ? COLORS.cyan : lp.eff>=80 ? COLORS.amber : COLORS.red,
                }}>{lp.eff}%</div>
              </div>
            ))}

            {/* Total */}
            <div style={{
              display:"grid", gridTemplateColumns:"1fr 52px 48px 38px", gap:6,
              paddingTop:10, marginTop:6, borderTop:"1px solid rgba(255,255,255,0.1)"
            }}>
              <div style={{ fontSize:12, fontWeight:800, color:"#a78bfa" }}>Total</div>
              <div style={{ fontSize:13, fontWeight:900, color:COLORS.amber }}>62.8</div>
              <div style={{ fontSize:13, fontWeight:900, color:COLORS.green }}>$7.53</div>
              <div style={{ fontSize:12, fontWeight:800, color:COLORS.cyan }}>88%</div>
            </div>
          </div>
        </div>
      </>}

      {/* ══ INSIGHTS TAB ══ */}
      {tab === "insights" && <>
        <div style={{ padding:"14px 20px 0" }}>
          <div style={{ fontSize:14, fontWeight:700, marginBottom:12 }}>Smart Insights</div>
          {[
            { icon:"⚠️", title:"High Consumer Alert", text:"Study Desk Lamp consumes 31.5% of total energy. Consider scheduling off-hours.",      color:COLORS.amber, tag:"Action needed" },
            { icon:"✅", title:"Efficiency Improved",  text:"Kitchen Downlight achieved 95% efficiency — best performer this month.",             color:COLORS.green,  tag:"Great" },
            { icon:"🔍", title:"Standby Drain",        text:"Front Porch logged $0.74 while showing 0V. Possible standby current or data lag.", color:COLORS.cyan,  tag:"Investigate" },
            { icon:"📉", title:"Cost Saving Trend",    text:"Month-over-month you're trending 8.3% lower. Projected to save $0.89 by Jun 30.", color:COLORS.purple, tag:"On track" },
            { icon:"💡", title:"Optimize Schedule",    text:"Bedroom Ceiling at 0W but still on. Automate off between midnight–6AM.",           color:COLORS.indigo, tag:"Tip" },
          ].map((a,i) => (
            <div key={i} style={{
              background: COLORS.card, border:`1px solid ${a.color}25`,
              borderLeft:`3px solid ${a.color}`,
              borderRadius:14, padding:"13px 14px",
              marginBottom:10, display:"flex", alignItems:"flex-start", gap:12,
            }}>
              <span style={{ fontSize:22, flexShrink:0, marginTop:1 }}>{a.icon}</span>
              <div style={{ flex:1 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4 }}>
                  <span style={{ fontSize:13, fontWeight:700, color:"white" }}>{a.title}</span>
                  <span style={{ fontSize:9, fontWeight:700, padding:"2px 8px", borderRadius:20, background:`${a.color}20`, color:a.color }}>{a.tag}</span>
                </div>
                <span style={{ fontSize:11, color:"#9ca3af", lineHeight:1.6 }}>{a.text}</span>
              </div>
            </div>
          ))}

          {/* Savings Summary */}
          <div style={{
            background:"linear-gradient(135deg,rgba(16,185,129,0.15),rgba(6,182,212,0.08))",
            border:"1px solid rgba(16,185,129,0.3)", borderRadius:18, padding:16, marginTop:4,
          }}>
            <div style={{ fontSize:12, color:COLORS.green, fontWeight:700, textTransform:"uppercase", letterSpacing:0.5 }}>💰 Savings Summary</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12, marginTop:12 }}>
              {[
                { label:"This Month", val:"$0.89", sub:"saved" },
                { label:"Projected", val:"$1.34", sub:"by Jun 30" },
                { label:"Annual Est.", val:"$16.1", sub:"savings" },
              ].map((s,i) => (
                <div key={i} style={{ textAlign:"center" }}>
                  <div style={{ fontSize:18, fontWeight:900, color:COLORS.green }}>{s.val}</div>
                  <div style={{ fontSize:9, color:"#6b7280", marginTop:2 }}>{s.label}</div>
                  <div style={{ fontSize:9, color:"#4b5563" }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>}

      <div style={{ height:88 }}/>

      {/* ── BOTTOM NAV ── */}
      <div style={{
        position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)",
        width:"100%", maxWidth:430,
        background:"rgba(8,12,26,0.96)", backdropFilter:"blur(24px)",
        borderTop:"1px solid rgba(255,255,255,0.07)",
        padding:"10px 8px 20px",
        display:"flex", justifyContent:"space-around",
      }}>
        {[
          { icon:"🏠", label:"Home" },
          { icon:"💡", label:"Lamps" },
          { icon:"⚡", label:"Energy", active:true },
          { icon:"👥", label:"Users" },
          { icon:"⋯", label:"More" },
        ].map((n,i) => (
          <div key={i} style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:3,cursor:"pointer",minWidth:50 }}>
            <span style={{ fontSize:22 }}>{n.icon}</span>
            <span style={{ fontSize:10, fontWeight: n.active?700:400, color: n.active ? "#a78bfa" : "#4b5563" }}>{n.label}</span>
            {n.active && <div style={{ width:22,height:2.5,borderRadius:2,background:"linear-gradient(90deg,#7c3aed,#6366f1)" }}/>}
          </div>
        ))}
      </div>
    </div>
  );
}