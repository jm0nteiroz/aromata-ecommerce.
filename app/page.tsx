"use client";

import { useMemo, useState } from "react";

type ThemeKey = "padrao" | "maes" | "namorados" | "natal";
type Product = { id:number; name:string; category:string; note:string; price:number; old?:number; source:"products"|"feed"|"natal"; position:string; badge?:string };

const themes: Record<ThemeKey, {label:string; eyebrow:string; title:string; text:string; cta:string}> = {
  padrao:{label:"Essência Arômata",eyebrow:"Casa perfumada, memórias presentes",title:"Perfume a casa. Guarde o momento.",text:"Aromas autorais para transformar o cotidiano em uma experiência que permanece.",cta:"Descobrir aromas"},
  maes:{label:"Dia das Mães",eyebrow:"Um presente que diz: eu me lembro",title:"Carinho que fica no ar.",text:"Uma curadoria delicada de velas e aromas para celebrar quem perfuma nossas melhores memórias.",cta:"Presentear com afeto"},
  namorados:{label:"Dia dos Namorados",eyebrow:"Acenda o momento",title:"A atmosfera do encontro.",text:"Fragrâncias envolventes para criar pausas, rituais e lembranças a dois.",cta:"Explorar a coleção"},
  natal:{label:"Natal Arômata",eyebrow:"A casa pronta para receber",title:"O aroma das celebrações.",text:"Notas aconchegantes, presentes especiais e a magia de reunir quem importa.",cta:"Viver o Natal"},
};

const products: Product[] = [
  {id:1,name:"Vela Vanilla",category:"Velas",note:"Baunilha • 70g",price:32,source:"products",position:"100% 0%",badge:"Mais vendido"},
  {id:2,name:"Home Spray Bambu",category:"Home Spray",note:"Verde fresco • 250ml",price:49,source:"products",position:"66.6% 100%"},
  {id:3,name:"Vela Tulipa Garden",category:"Velas",note:"Floral marcante • 180g",price:68,source:"feed",position:"100% 100%",badge:"Lançamento"},
  {id:4,name:"Difusor Groselha Negra",category:"Difusores",note:"Frutado elegante • 250ml",price:59,old:69,source:"feed",position:"33.3% 0%",badge:"-14%"},
  {id:5,name:"Sabonete Chá Verde & Lavanda",category:"Corpo & Banho",note:"Suave • 250ml",price:55,source:"feed",position:"100% 0%"},
  {id:6,name:"Kit Três Essências",category:"Presentes",note:"Edição especial",price:90,source:"feed",position:"0% 100%"},
  {id:7,name:"Vela Figo com Caramelo",category:"Velas",note:"Natal • 120g",price:42,source:"natal",position:"33.3% 100%",badge:"Natal"},
  {id:8,name:"Kit Difusor & Vela",category:"Presentes",note:"Figo com caramelo",price:120,source:"natal",position:"100% 0%"},
];

const money = (n:number) => n.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});

function ProductVisual({product, large=false}:{product:Product;large?:boolean}){
  return <div className={`product-visual visual-${product.source} ${large?"large":""}`} style={{backgroundPosition:product.position}} role="img" aria-label={product.name}/>;
}

export default function Home(){
  const [mode,setMode]=useState<"client"|"admin">("client");
  const [theme,setTheme]=useState<ThemeKey>("padrao");
  const [category,setCategory]=useState("Todos");
  const [cart,setCart]=useState<Record<number,number>>({});
  const [cartOpen,setCartOpen]=useState(false);
  const [selected,setSelected]=useState<Product|null>(null);
  const [adminTab,setAdminTab]=useState("Visão geral");
  const [toast,setToast]=useState("");
  const current=themes[theme];
  const categories=["Todos","Velas","Difusores","Home Spray","Presentes"];
  const filtered=category==="Todos"?products:products.filter(p=>p.category===category);
  const cartItems=useMemo(()=>products.filter(p=>cart[p.id]).map(p=>({...p,qty:cart[p.id]})),[cart]);
  const total=cartItems.reduce((sum,p)=>sum+p.price*p.qty,0);
  const cartCount=cartItems.reduce((sum,p)=>sum+p.qty,0);
  const add=(id:number)=>{setCart(c=>({...c,[id]:(c[id]||0)+1}));setToast("Produto adicionado ao carrinho");setTimeout(()=>setToast(""),1800)};
  const checkout=()=>{
    const lines=cartItems.map(p=>`• ${p.qty}x ${p.name} — ${money(p.price*p.qty)}`).join("\n");
    const text=encodeURIComponent(`Olá, Arômata! Quero fazer este pedido:\n\n${lines}\n\nTotal: ${money(total)}`);
    window.open(`https://wa.me/message/WG4HD7NOJO7RJ1?text=${text}`,"_blank","noopener,noreferrer");
  };

  return <main className={`site theme-${theme}`}>
    <div className="prototype-bar"><span>Protótipo navegável</span><div className="mode-switch"><button className={mode==="client"?"active":""} onClick={()=>setMode("client")}>Visão cliente</button><button className={mode==="admin"?"active":""} onClick={()=>setMode("admin")}>Visão administrador</button></div></div>
    {mode==="client" ? <>
      <div className="announcement">Frete grátis em pedidos acima de R$ 199 <span>•</span> Feito à mão com afeto</div>
      <header className="store-header">
        <button className="wordmark" onClick={()=>window.scrollTo({top:0,behavior:"smooth"})}>ARÔMATA</button>
        <nav><a href="#colecoes">Coleções</a><a href="#catalogo">Produtos</a><a href="#essencia">Nossa essência</a></nav>
        <div className="header-actions"><button aria-label="Buscar">⌕</button><button onClick={()=>setCartOpen(true)} aria-label={`Carrinho com ${cartCount} itens`}>Sacola <b>{cartCount}</b></button></div>
      </header>
      <section className="hero">
        <div className="hero-copy"><p className="eyebrow">{current.eyebrow}</p><h1>{current.title}</h1><p className="hero-text">{current.text}</p><a className="glow-button" href="#catalogo"><span>{current.cta}</span></a><div className="hero-proof"><span>◌ Produção artesanal</span><span>♧ Embalagem presenteável</span></div></div>
        <div className="hero-stage"><div className="soft-orb"/><div className={`hero-photo hero-photo-${theme}`}><span>{current.label}</span></div><p className="vertical-note">IDENTIDADE OLFATIVA • DESDE 2021</p></div>
      </section>
      <section id="colecoes" className="collections-section"><div className="section-heading"><p className="eyebrow">Mude a atmosfera</p><h2>Uma loja para cada momento.</h2><p>Selecione uma coleção e veja toda a experiência ganhar uma nova expressão.</p></div><div className="theme-tabs">{(Object.keys(themes) as ThemeKey[]).map(k=><button key={k} onClick={()=>setTheme(k)} className={theme===k?"active":""}><i/><span>{themes[k].label}</span><small>{k==="padrao"?"Atemporal":k==="maes"?"Delicada":k==="namorados"?"Envolvente":"Aconchegante"}</small></button>)}</div></section>
      <section id="catalogo" className="catalog-section"><div className="catalog-head"><div><p className="eyebrow">Curadoria Arômata</p><h2>Escolha pelo sentir.</h2></div><div className="filters">{categories.map(c=><button className={category===c?"active":""} onClick={()=>setCategory(c)} key={c}>{c}</button>)}</div></div><div className="product-grid">{filtered.map(p=><article className="product-card" key={p.id}><button className="product-image-button" onClick={()=>setSelected(p)} aria-label={`Ver ${p.name}`}><ProductVisual product={p}/>{p.badge&&<span className="badge">{p.badge}</span>}<span className="quick-view">Ver detalhes</span></button><div className="product-info"><div><p>{p.category}</p><h3>{p.name}</h3><small>{p.note}</small></div><div className="price-row">{p.old&&<del>{money(p.old)}</del>}<strong>{money(p.price)}</strong></div><button className="add-button" onClick={()=>add(p.id)} aria-label={`Adicionar ${p.name}`}>+</button></div></article>)}</div></section>
      <section className="story" id="essencia"><div className="story-image"><span>ARÔMATA</span></div><div className="story-copy"><p className="eyebrow">Nossa essência</p><h2>Perfumar é uma forma de cuidar.</h2><p>A Arômata nasce do desejo de transformar ambientes em memórias inesquecíveis. Cada fragrância é um convite para desacelerar e perceber a beleza dos pequenos rituais.</p><a href="#catalogo">Conheça nossos aromas <span>→</span></a><div className="story-stats"><span><b>+24</b> aromas autorais</span><span><b>100%</b> feito com cuidado</span></div></div></section>
      <section className="newsletter"><p className="eyebrow">Entre para a nossa lista perfumada</p><h2>Novidades que chegam antes.</h2><form onSubmit={e=>{e.preventDefault();setToast("Cadastro realizado com carinho")}}><input type="email" placeholder="Seu melhor e-mail" aria-label="Seu melhor e-mail" required/><button>Quero receber</button></form></section>
      <footer><div className="footer-brand"><b>ARÔMATA</b><p>Transformando momentos em memórias inesquecíveis.</p></div><div><strong>Navegue</strong><a href="#catalogo">Produtos</a><a href="#colecoes">Coleções</a><a href="#essencia">Nossa essência</a></div><div><strong>Atendimento</strong><a href="https://wa.me/message/WG4HD7NOJO7RJ1">WhatsApp</a><a href="#">Trocas e entregas</a><a href="#">Dúvidas frequentes</a></div><div><strong>Siga o aroma</strong><a href="https://instagram.com/aromata_aromatizantes">@aromata_aromatizantes</a><p>© 2026 Arômata</p></div></footer>
    </> : <AdminView tab={adminTab} setTab={setAdminTab} theme={theme} setTheme={setTheme} onPreview={()=>setMode("client")}/>} 

    {cartOpen&&<div className="overlay" onMouseDown={()=>setCartOpen(false)}><aside className="cart-drawer" onMouseDown={e=>e.stopPropagation()}><div className="drawer-head"><div><p className="eyebrow">Sua seleção</p><h2>Sacola <span>({cartCount})</span></h2></div><button onClick={()=>setCartOpen(false)}>×</button></div>{cartItems.length===0?<div className="empty-cart"><b>Por enquanto, só perfume no ar.</b><p>Escolha algo especial para começar sua sacola.</p><button onClick={()=>setCartOpen(false)}>Explorar produtos</button></div>:<><div className="cart-list">{cartItems.map(p=><div className="cart-item" key={p.id}><ProductVisual product={p}/><div><h3>{p.name}</h3><p>{p.note}</p><div className="qty"><button onClick={()=>setCart(c=>({...c,[p.id]:Math.max(0,c[p.id]-1)}))}>−</button><span>{p.qty}</span><button onClick={()=>add(p.id)}>+</button></div></div><strong>{money(p.price*p.qty)}</strong></div>)}</div><div className="cart-total"><div><span>Subtotal</span><b>{money(total)}</b></div><small>Frete calculado no atendimento</small><button onClick={checkout}>Finalizar pelo WhatsApp <span>→</span></button></div></>}</aside></div>}
    {selected&&<div className="overlay modal-overlay" onMouseDown={()=>setSelected(null)}><section className="product-modal" onMouseDown={e=>e.stopPropagation()}><button className="modal-close" onClick={()=>setSelected(null)}>×</button><ProductVisual product={selected} large/><div className="modal-copy"><p className="eyebrow">{selected.category}</p><h2>{selected.name}</h2><p>{selected.note}</p><div className="scent-notes"><span>Saída<small>Frescor</small></span><span>Corpo<small>Floral</small></span><span>Fundo<small>Conforto</small></span></div><strong>{money(selected.price)}</strong><button onClick={()=>{add(selected.id);setSelected(null);setCartOpen(true)}}>Adicionar à sacola</button><small>Produção artesanal • Envio seguro • Presenteável</small></div></section></div>}
    {toast&&<div className="toast">✓ {toast}</div>}
  </main>;
}

function AdminView({tab,setTab,theme,setTheme,onPreview}:{tab:string;setTab:(s:string)=>void;theme:ThemeKey;setTheme:(t:ThemeKey)=>void;onPreview:()=>void}){
  const tabs=["Visão geral","Produtos","Coleções","Promoções","Pedidos","Clientes"];
  return <div className="admin-shell"><aside className="admin-sidebar"><div className="admin-logo">ARÔMATA <small>GESTÃO</small></div><nav>{tabs.map((t,i)=><button className={tab===t?"active":""} onClick={()=>setTab(t)} key={t}><span>{["⌂","□","◉","%","▤","♙"][i]}</span>{t}{t==="Pedidos"&&<b>4</b>}</button>)}</nav><div className="admin-profile"><i>AM</i><span><b>Aromata</b><small>Administradora</small></span><button>•••</button></div></aside><div className="admin-main"><header className="admin-header"><div><p>Protótipo do painel</p><h1>{tab}</h1></div><div><button className="preview-button" onClick={onPreview}>Ver loja ↗</button><button className="avatar">AM</button></div></header>{tab==="Visão geral"&&<Dashboard/>}{tab==="Produtos"&&<ProductsAdmin/>}{tab==="Coleções"&&<CollectionsAdmin theme={theme} setTheme={setTheme} onPreview={onPreview}/>} {tab==="Promoções"&&<PromotionsAdmin/>}{tab==="Pedidos"&&<OrdersAdmin/>}{tab==="Clientes"&&<CustomersAdmin/>}</div></div>;
}

function Dashboard(){return <div className="dashboard"><div className="welcome"><div><p className="eyebrow">Terça-feira, 25 de agosto</p><h2>Bom dia, Arômata.</h2><p>A loja está perfumada e pronta para vender.</p></div><button>+ Adicionar produto</button></div><div className="metric-grid"><Metric label="Vendas no mês" value="R$ 3.840" change="+18,4%"/><Metric label="Pedidos" value="42" change="+12,1%"/><Metric label="Ticket médio" value="R$ 91,42" change="+5,3%"/><Metric label="Clientes" value="128" change="+8 novos"/></div><div className="admin-grid"><section className="sales-chart"><div className="panel-title"><div><p>Visão de vendas</p><h3>Desempenho mensal</h3></div><select aria-label="Período"><option>Últimos 6 meses</option></select></div><div className="bars">{[38,52,44,68,61,86].map((h,i)=><div key={i}><span style={{height:`${h}%`}}/><small>{["Mar","Abr","Mai","Jun","Jul","Ago"][i]}</small></div>)}</div></section><section className="top-products"><div className="panel-title"><div><p>Mais desejados</p><h3>Produtos em destaque</h3></div><button>Ver todos</button></div>{products.slice(0,4).map((p,i)=><div className="mini-product" key={p.id}><ProductVisual product={p}/><span><b>{p.name}</b><small>{[18,14,11,9][i]} vendas</small></span><strong>{money(p.price)}</strong></div>)}</section></div><section className="orders-panel"><div className="panel-title"><div><p>Movimento da loja</p><h3>Pedidos recentes</h3></div><button>Ver todos</button></div><OrderTable/></section></div>}
function Metric({label,value,change}:{label:string;value:string;change:string}){return <article className="metric"><p>{label}</p><h3>{value}</h3><span>↗ {change}</span><i/></article>}
function OrderTable(){return <div className="table"><div className="table-row head"><span>Pedido</span><span>Cliente</span><span>Data</span><span>Total</span><span>Status</span></div>{[["#1042","Mariana Dias","Hoje, 10:42","R$ 132,00","Novo"],["#1041","Beatriz Lima","Hoje, 09:18","R$ 90,00","Em preparo"],["#1040","Camila Rocha","Ontem, 18:35","R$ 214,00","Enviado"],["#1039","Paula Nunes","Ontem, 14:02","R$ 68,00","Concluído"]].map(r=><div className="table-row" key={r[0]}>{r.map((c,i)=><span key={c} className={i===4?`status s${i}`:""}>{c}</span>)}</div>)}</div>}
function ProductsAdmin(){return <div className="admin-content"><div className="content-toolbar"><div className="searchbox">⌕ <input placeholder="Buscar por produto..."/></div><div><button>Filtrar</button><button className="primary">+ Novo produto</button></div></div><section className="admin-list"><div className="list-head"><span>Produto</span><span>Categoria</span><span>Estoque</span><span>Preço</span><span>Status</span><span/></div>{products.map((p,i)=><div className="list-row" key={p.id}><span className="list-product"><ProductVisual product={p}/><b>{p.name}</b></span><span>{p.category}</span><span>{[12,8,6,15,9,4,18,5][i]} un.</span><span>{money(p.price)}</span><span><i className="online"/> Ativo</span><button>•••</button></div>)}</section></div>}
function CollectionsAdmin({theme,setTheme,onPreview}:{theme:ThemeKey;setTheme:(t:ThemeKey)=>void;onPreview:()=>void}){return <div className="admin-content"><div className="content-toolbar"><p>Escolha o tema ativo da vitrine. O visual do site muda instantaneamente.</p><button className="primary">+ Nova coleção</button></div><div className="collection-admin-grid">{(Object.keys(themes) as ThemeKey[]).map(k=><article className={`collection-admin-card ca-${k} ${theme===k?"active":""}`} key={k}><div className="theme-preview"><span>ARÔMATA</span><b>{themes[k].label}</b></div><div><span><h3>{themes[k].label}</h3><p>{k==="padrao"?"Coleção permanente":"Coleção sazonal"}</p></span>{theme===k?<b className="active-pill">Tema ativo</b>:<button onClick={()=>setTheme(k)}>Ativar tema</button>}</div></article>)}</div><button className="preview-theme" onClick={onPreview}>Visualizar tema na loja →</button></div>}
function PromotionsAdmin(){return <div className="admin-content"><div className="promo-hero"><div><p className="eyebrow">Campanhas</p><h2>Crie motivos para voltar.</h2><p>Planeje ofertas, destaque produtos e acompanhe o período de cada promoção.</p></div><button>+ Criar promoção</button></div><div className="promo-grid"><article><span className="promo-icon">%</span><div><small>ATIVA ATÉ 31 AGO</small><h3>Festival de Velas</h3><p>15% de desconto em todas as velas</p><b>8 produtos participantes</b></div><i>Ativa</i></article><article><span className="promo-icon">♧</span><div><small>AGENDADA • 01 SET</small><h3>Semana do Aroma</h3><p>Frete grátis acima de R$ 149</p><b>Toda a loja</b></div><i>Agendada</i></article></div></div>}
function OrdersAdmin(){return <div className="admin-content"><div className="content-toolbar"><div className="filters"><button className="active">Todos 42</button><button>Novos 4</button><button>Em preparo 8</button><button>Enviados 12</button></div><button>Exportar</button></div><section className="orders-panel"><OrderTable/></section></div>}
function CustomersAdmin(){return <div className="admin-content"><div className="customer-summary"><Metric label="Clientes cadastrados" value="128" change="+8 este mês"/><Metric label="Clientes recorrentes" value="34%" change="+4,2%"/><Metric label="Aniversários do mês" value="11" change="oportunidades"/></div><section className="admin-list customer-list"><div className="list-head"><span>Cliente</span><span>Contato</span><span>Pedidos</span><span>Total gasto</span><span>Última compra</span></div>{[["Mariana Dias","mariana@email.com","6","R$ 684,00","Hoje"],["Beatriz Lima","bia@email.com","4","R$ 438,00","Hoje"],["Camila Rocha","camila@email.com","8","R$ 912,00","Ontem"],["Paula Nunes","paula@email.com","3","R$ 286,00","Ontem"]].map(r=><div className="list-row" key={r[0]}>{r.map((c,i)=><span key={c} className={i===0?"customer-name":""}>{i===0&&<i>{c.split(" ").map(x=>x[0]).join("")}</i>}{c}</span>)}</div>)}</section></div>}
