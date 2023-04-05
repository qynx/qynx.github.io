import{c as B,p as sn}from"./constant-6af51708.js";import{an as en,ao as y,am as ln,ap as H,aq as q,ar as L,as as b,at as an,au as rn,av as t,aw as un,ax as on,ay as tn}from"./mermaid.core-2f3b6a92.js";function fn(l){return l.innerRadius}function cn(l){return l.outerRadius}function yn(l){return l.startAngle}function gn(l){return l.endAngle}function mn(l){return l&&l.padAngle}function pn(l,d,E,w,h,v,C,a){var i=E-l,n=w-d,m=C-h,s=a-v,r=s*i-m*n;if(!(r*r<y))return r=(m*(d-v)-s*(l-h))/r,[l+r*i,d+r*n]}function V(l,d,E,w,h,v,C){var a=l-E,i=d-w,n=(C?v:-v)/L(a*a+i*i),m=n*i,s=-n*a,r=l+m,f=d+s,c=E+m,I=w+s,o=(r+c)/2,O=(f+I)/2,p=c-r,g=I-f,A=p*p+g*g,S=h-v,P=r*I-c*f,j=(g<0?-1:1)*L(tn(0,S*S*A-P*P)),z=(P*g-p*j)/A,x=(-P*p-g*j)/A,R=(P*g+p*j)/A,T=(-P*p+g*j)/A,e=z-o,u=x-O,F=R-o,G=T-O;return e*e+u*u>F*F+G*G&&(z=R,x=T),{cx:z,cy:x,x01:-m,y01:-s,x11:z*(h/S-1),y11:x*(h/S-1)}}function hn(){var l=fn,d=cn,E=B(0),w=null,h=yn,v=gn,C=mn,a=null;function i(){var n,m,s=+l.apply(this,arguments),r=+d.apply(this,arguments),f=h.apply(this,arguments)-en,c=v.apply(this,arguments)-en,I=an(c-f),o=c>f;if(a||(a=n=sn()),r<s&&(m=r,r=s,s=m),!(r>y))a.moveTo(0,0);else if(I>ln-y)a.moveTo(r*H(f),r*q(f)),a.arc(0,0,r,f,c,!o),s>y&&(a.moveTo(s*H(c),s*q(c)),a.arc(0,0,s,c,f,o));else{var O=f,p=c,g=f,A=c,S=I,P=I,j=C.apply(this,arguments)/2,z=j>y&&(w?+w.apply(this,arguments):L(s*s+r*r)),x=b(an(r-s)/2,+E.apply(this,arguments)),R=x,T=x,e,u;if(z>y){var F=un(z/s*q(j)),G=un(z/r*q(j));(S-=F*2)>y?(F*=o?1:-1,g+=F,A-=F):(S=0,g=A=(f+c)/2),(P-=G*2)>y?(G*=o?1:-1,O+=G,p-=G):(P=0,O=p=(f+c)/2)}var J=r*H(O),K=r*q(O),M=s*H(A),N=s*q(A);if(x>y){var Q=r*H(p),U=r*q(p),W=s*H(g),X=s*q(g),D;if(I<rn&&(D=pn(J,K,W,X,Q,U,M,N))){var Y=J-D[0],Z=K-D[1],$=Q-D[0],k=U-D[1],_=1/q(on((Y*$+Z*k)/(L(Y*Y+Z*Z)*L($*$+k*k)))/2),nn=L(D[0]*D[0]+D[1]*D[1]);R=b(x,(s-nn)/(_-1)),T=b(x,(r-nn)/(_+1))}}P>y?T>y?(e=V(W,X,J,K,r,T,o),u=V(Q,U,M,N,r,T,o),a.moveTo(e.cx+e.x01,e.cy+e.y01),T<x?a.arc(e.cx,e.cy,T,t(e.y01,e.x01),t(u.y01,u.x01),!o):(a.arc(e.cx,e.cy,T,t(e.y01,e.x01),t(e.y11,e.x11),!o),a.arc(0,0,r,t(e.cy+e.y11,e.cx+e.x11),t(u.cy+u.y11,u.cx+u.x11),!o),a.arc(u.cx,u.cy,T,t(u.y11,u.x11),t(u.y01,u.x01),!o))):(a.moveTo(J,K),a.arc(0,0,r,O,p,!o)):a.moveTo(J,K),!(s>y)||!(S>y)?a.lineTo(M,N):R>y?(e=V(M,N,Q,U,s,-R,o),u=V(J,K,W,X,s,-R,o),a.lineTo(e.cx+e.x01,e.cy+e.y01),R<x?a.arc(e.cx,e.cy,R,t(e.y01,e.x01),t(u.y01,u.x01),!o):(a.arc(e.cx,e.cy,R,t(e.y01,e.x01),t(e.y11,e.x11),!o),a.arc(0,0,s,t(e.cy+e.y11,e.cx+e.x11),t(u.cy+u.y11,u.cx+u.x11),o),a.arc(u.cx,u.cy,R,t(u.y11,u.x11),t(u.y01,u.x01),!o))):a.arc(0,0,s,A,g,o)}if(a.closePath(),n)return a=null,n+""||null}return i.centroid=function(){var n=(+l.apply(this,arguments)+ +d.apply(this,arguments))/2,m=(+h.apply(this,arguments)+ +v.apply(this,arguments))/2-rn/2;return[H(m)*n,q(m)*n]},i.innerRadius=function(n){return arguments.length?(l=typeof n=="function"?n:B(+n),i):l},i.outerRadius=function(n){return arguments.length?(d=typeof n=="function"?n:B(+n),i):d},i.cornerRadius=function(n){return arguments.length?(E=typeof n=="function"?n:B(+n),i):E},i.padRadius=function(n){return arguments.length?(w=n==null?null:typeof n=="function"?n:B(+n),i):w},i.startAngle=function(n){return arguments.length?(h=typeof n=="function"?n:B(+n),i):h},i.endAngle=function(n){return arguments.length?(v=typeof n=="function"?n:B(+n),i):v},i.padAngle=function(n){return arguments.length?(C=typeof n=="function"?n:B(+n),i):C},i.context=function(n){return arguments.length?(a=n??null,i):a},i}export{hn as a};
