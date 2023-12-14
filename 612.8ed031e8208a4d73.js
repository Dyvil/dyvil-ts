(()=>{"use strict";var o,P={11612:(o,p,i)=>{i(35618);var l=i(44017),g=(i(74399),i(83981));console.log("Running Dyvil Compiler Server in Web Worker"),self.addEventListener("message",y=>{const f=y.data.compile;if(f){const h=(0,l.V3)(f).resolve(new g._([])).toString("js");self.postMessage({compiled:h})}})},127:(o,p,i)=>{i.d(p,{YN:()=>O,_w:()=>w,d2:()=>b,dm:()=>S,eB:()=>h,gN:()=>$,n$:()=>k,v_:()=>m,wT:()=>t});var v=i(48709),l=i(74399),c=i(42323),g=i(83981),y=i(46187),f=i(38426);class h extends c.NB{constructor(s,e=[]){super("unit"),this.path=s,this.classes=e,this.diagnostics=[]}report(s){this.diagnostics.push(s)}resolve(s){const e={[h.enclosing]:this};for(const r of this.classes)e[r.name]=r;return super.resolve(new g._(e,s))}toString(s){return this.classes.map(e=>e.toString(s)).join("\n\n")}}h.enclosing=Symbol("enclosing compilation unit"),h.parser="file";class n extends c.NB{constructor(s,e){super(s),this.name=e,this._references=[]}documentation(){return this.doc}references(){return[this,...this._references]}}class t extends n{constructor(s="<anonymous>",e=[],r=[],d=[]){super("class",s),this.fields=e,this.constructors=r,this.methods=d}asType(){const s=new f.rF(this.name);return s._class=this,s.location=this.location,s}asCompletion(){return{label:this.name,kind:"class"}}toString(s){return c.$S`
    class ${this.name} {
      ${this.fields.map(e=>e.toString(s)).join("\n")}

      ${this.constructors.map(e=>e.toString(s)).join("\n\n")}

      ${this.methods.map(e=>e.toString(s)).join("\n\n")}
    }`}lookup(s,e,...r){for(const d of this.fields)if(d.name===s&&d instanceof e)return d;for(const d of this.methods)if(d.name===s&&d instanceof e&&d.overloads(r[0]))return d;for(const d of this.constructors)if(d instanceof e&&d.overloads(r[0]))return d}list(){return[...this.fields,...this.methods]}resolve(s){const e=new g._({[t.enclosing]:this},s);super.resolve(e);for(const r of this.fields)this.fields.some(d=>d!==r&&d.name===r.name)&&(0,l.Hj)(s,r.location,`duplicate field ${r.name}`);for(const r of this.methods)this.methods.some(d=>d!==r&&d.jsName===r.jsName)&&(0,l.Hj)(s,r.location,`duplicate method ${r.name} with mangled name ${r.jsName}`);return this}}t.enclosing=Symbol("enclosing class"),t.parser="class";class a extends n{constructor(s,e,r,d){super(s,e),this.parameters=r,this.body=d}resolve(s){this._thisClass||(this._thisClass=s.lookup(t.enclosing,t)),this._thisClass&&!this._thisParameter&&(this._thisParameter=new b("this",this._thisClass.asType()),this._thisParameter.location=this.location);const e=new g._(this._thisParameter?[this._thisParameter,...this.parameters]:this.parameters,s);return super.resolve(e)}overloads(s){return s.length===this.parameters.length&&this.parameters.every((e,r)=>(0,f.BM)(e.type,s[r]))}}let m=(()=>{class _ extends a{constructor(e=[],r=new y.gO){super("constructor","init",e,r)}toString(e){return`${"js"===e?"constructor":"init"}(${this.parameters.map(r=>r.toString(e)).join(", ")}) ${this.body.toString(e)}`}documentation(){return this.parameters.length?c.$S`
    ${this.doc}

    #### Parameters
    ${this.parameters.map(e=>"- "+e.documentation()).join("\n")}
    `:this.doc}references(e){return"rename"===e?[]:super.references()}}return _.completion={kind:"keyword",label:"init",snippet:"init(${1:parameters...}) {\n  ${2:statements...}\n}"},_.parser="ctor",_})(),$=(()=>{class _ extends n{constructor(e="<unknown>",r=f.NI,d){super("field",e),this.type=r,this.value=d}asCompletion(){return{label:this.name,kind:"field",signature:": "+this.type.toString()}}toString(e){return"js"===e?c.$S`
      _${this.name}${this.value?" = "+this.value.toString(e):""};

      get ${this.name}() {
        return this._${this.name};
      }

      set ${this.name}(value) {
        this._${this.name} = value;
      }`:`var ${this.name}: ${this.type.toString(e)}${this.value?" = "+this.value.toString(e):""}`}}return _.completion={kind:"keyword",label:"var",snippet:"var ${1:name}: ${2:type} = ${3:value}"},_.parser="field",_})(),k=(()=>{class _ extends a{constructor(e="<unknown>",r=[],d=f.NI,j=new y.gO){super("method",e,r,j),this.returnType=d}get jsName(){return this.name+this.parameters.map(e=>"_"+e.name).join("")}asCompletion(){return{label:this.name,kind:"method",signature:`(${this.parameters.map(e=>e.type.toString()).join(", ")})${this.returnType?": "+this.returnType.toString():""}`,snippet:`${this.name}(${this.parameters.map((e,r)=>`\${${r}:${e.name}}`).join(", ")})`}}documentation(){let e=this.doc||"";return this.parameters.length&&(e+="\n#### Parameters\n"+this.parameters.map(r=>"- "+r.documentation()).join("\n")),("type:primitive"!==this.returnType.kind||"void"!==this.returnType.name)&&(e+="\n#### Returns\n`"+this.returnType.toString()+"`"),e}toString(e){return`${"js"!==e?"func "+this.name:this.jsName}(${this.parameters.map(r=>r.toString(e)).join(", ")})${"js"!==e?": "+this.returnType.toString(e):""} ${this.body.toString(e)}`}}return _.completion={kind:"keyword",label:"func",snippet:"func ${1:name}(${2:parameters...}) {\n  ${3:statements...}\n}"},_.parser="method",_})();class S extends c.NB{constructor(s){super("class-completion"),this.name=s}toString(s){return this.name}resolve(s){return(0,l.Hk)(s,this.location,this.name,{extra:S.completions}),super.resolve(s)}}S.completions=[k,m,$].map(_=>_.completion);class O extends n{constructor(s,e,r){super(s,e),this.type=r}asCompletion(){return{label:this.name,kind:this.kind,signature:this.type?": "+this.type.toString():void 0}}toString(s){return`${this.name}${this.type?": "+this.type.toString(s):""}`}}let b=(()=>{class _ extends O{constructor(e="<unknown>",r=f.NI){super("parameter",e,r),this.type=r}references(e){return"rename"===e&&"this"===this.name?[]:super.references()}documentation(){return`\`${this.name}: ${this.type.toString()}\`${this.doc?"\n"+this.doc:""}`}toString(e){return"js"===e?this.name:super.toString(e)}}return _.parser="parameter",_})(),w=(()=>{class _ extends O{constructor(e="<unknown>",r,d=v.iY){super("variable",e,r),this.value=d}documentation(){var e;return`\`var ${this.name}: ${null===(e=this.type)||void 0===e?void 0:e.toString()}\`${this.doc?"\n"+this.doc:""}`}toString(e){return"js"===e?`let ${this.name} = ${this.value.toString(e)}`:`var ${this.name}${this.type?": "+this.type.toString(e):""} = ${this.value.toString(e)}`}resolve(e){const r=super.resolve(e);return r.type||(r.type=r.value.getType()),r}}return _.parser="variable",_})()},35618:(o,p,i)=>{i.d(p,{K9:()=>c.K9,MX:()=>g.MX,UX:()=>c.UX,WJ:()=>c.WJ,ZJ:()=>l.ZJ,_C:()=>l._C,_w:()=>v._w,d2:()=>v.d2,dm:()=>v.dm,eB:()=>v.eB,gN:()=>v.gN,gO:()=>c.gO,jR:()=>l.jR,lX:()=>l.lX,n$:()=>v.n$,o6:()=>l.o6,on:()=>c.on,rF:()=>g.rF,rX:()=>c.rX,sW:()=>l.sW,sj:()=>c.sj,t$:()=>l.t$,v_:()=>v.v_,wT:()=>v.wT});var v=i(127),l=i(48709),c=i(46187),g=i(38426)},42323:(o,p,i)=>{i.d(p,{$S:()=>f,NB:()=>l});class l{constructor(n){this.kind=n}definition(n){}documentation(){var n;return null===(n=this.definition())||void 0===n?void 0:n.documentation()}references(n){var t;return(null===(t=this.definition(n))||void 0===t?void 0:t.references(n))||[]}resolve(n){return function c(h,n){for(const[t,a]of Object.entries(h))if("location"!==t&&"kind"!==t&&!t.startsWith("_")&&a)if(Array.isArray(a))for(let m=0;m<a.length;m++)a[m]instanceof l&&(a[m]=n(a[m]));else a instanceof l&&(h[t]=n(a))}(this,t=>t.resolve(n)),this}link(){for(const[n,t]of Object.entries(this))n.startsWith("_")&&"_references"in t&&t._references.push(this);for(const n of y(this))n.link()}findByPosition(n){var t;if(!this.range||this.range.includes(n)){for(const a of y(this)){const m=a.findByPosition(n);if(m)return[this,...m]}if(null!==(t=this.location)&&void 0!==t&&t.includes(n))return[this]}}toString(n){return`<${this.kind}>`}}function*y(h){for(const[n,t]of Object.entries(h))if("location"!==n&&"kind"!==n&&!n.startsWith("_")&&t)if(Array.isArray(t))for(let a=0;a<t.length;a++)t[a]instanceof l&&(yield t[a]);else t instanceof l&&(yield t)}function f(h,...n){if(!h[0].startsWith("\n"))throw new Error("must start with a newline");const t=h[0].match(/^\n([ \t]*)/)[1];return h.map((a,m)=>{var $;0===m&&(a=a.substring(1+t.length));const S=(a=a.replace(new RegExp("^"+t,"gm"),"")).substring(a.lastIndexOf("\n")+1).match(/^\s*/)[0];return a+(null!==($=n[m])&&void 0!==$?$:"").toString().replace(/\n/g,`\n${S}`)}).join("")}},74399:(o,p,i)=>{i.d(p,{Hj:()=>f,Hk:()=>h,Ly:()=>l,R9:()=>g,e6:()=>c});var v=i(35618);class l{constructor(t,a){this.line=t,this.column=a}}class c{constructor(t,a){this.start=t,this.end=a}includes(t){return this.start.line<=t.line&&t.line<=this.end.line&&(this.start.line<t.line||this.start.column<=t.column)&&(t.line<this.end.line||t.column<=this.end.column)}}class g{constructor(t,a,m,$="error",k){if(this.path=t,this.location=a,this.message=m,this.severity=$,this.expected=k,!a)throw new Error("location is required")}}function f(n,t,a,m="error",$){const k=n.lookup(v.eB.enclosing,v.eB),S=new g(void 0,t,a,m,$);k?k.report(S):function y(n){const{path:t,location:{start:{line:a,column:m}},message:$,severity:k}=n;switch(k){case"error":console.error(`${t}:${a}:${m}: error: ${$}`);break;case"warning":console.warn(`${t}:${a}:${m}: warning: ${$}`);break;case"note":console.info(`${t}:${a}:${m}: note: ${$}`)}if(n.expected)for(let S of n.expected)console.log(`- [${S.kind}] ${S.label} ${S.signature||""} - ${S.description||""}`)}(S)}function h(n,t,a,{lookup:m,kind:$,extra:k}={}){if(!a.includes("\xa7"))return!1;const S=a.slice(0,-1),O=(m||n).list().filter(w=>"name"in w).filter(w=>!$||w.kind===$).map(w=>"asCompletion"in w?w.asCompletion():{kind:w.kind,label:w.name});return f(n,t,"input '\xa7' expecting","error",(k?[...O,...k]:O).filter(w=>w.label.startsWith(S))),!0}}},E={};function u(o){var p=E[o];if(void 0!==p)return p.exports;var i=E[o]={exports:{}};return P[o].call(i.exports,i,i.exports,u),i.exports}u.m=P,u.x=()=>{var o=u.O(void 0,[35],()=>u(11612));return u.O(o)},o=[],u.O=(p,i,v,l)=>{if(!i){var g=1/0;for(c=0;c<o.length;c++){for(var[i,v,l]=o[c],y=!0,f=0;f<i.length;f++)(!1&l||g>=l)&&Object.keys(u.O).every($=>u.O[$](i[f]))?i.splice(f--,1):(y=!1,l<g&&(g=l));if(y){o.splice(c--,1);var h=v();void 0!==h&&(p=h)}}return p}l=l||0;for(var c=o.length;c>0&&o[c-1][2]>l;c--)o[c]=o[c-1];o[c]=[i,v,l]},u.d=(o,p)=>{for(var i in p)u.o(p,i)&&!u.o(o,i)&&Object.defineProperty(o,i,{enumerable:!0,get:p[i]})},u.f={},u.e=o=>Promise.all(Object.keys(u.f).reduce((p,i)=>(u.f[i](o,p),p),[])),u.u=o=>o+".91888729947aee93.js",u.miniCssF=o=>{},u.o=(o,p)=>Object.prototype.hasOwnProperty.call(o,p),(()=>{var o;u.tt=()=>(void 0===o&&(o={createScriptURL:p=>p},typeof trustedTypes<"u"&&trustedTypes.createPolicy&&(o=trustedTypes.createPolicy("angular#bundler",o))),o)})(),u.tu=o=>u.tt().createScriptURL(o),u.p="",(()=>{var o={612:1};u.f.i=(l,c)=>{o[l]||importScripts(u.tu(u.p+u.u(l)))};var i=self.webpackChunkweb=self.webpackChunkweb||[],v=i.push.bind(i);i.push=l=>{var[c,g,y]=l;for(var f in g)u.o(g,f)&&(u.m[f]=g[f]);for(y&&y(u);c.length;)o[c.pop()]=1;v(l)}})(),(()=>{var o=u.x;u.x=()=>u.e(35).then(o)})(),u.x()})();