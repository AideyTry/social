import{r as o}from"./index.08ac6b95.js";const s=s=>o("/communications/setFollow","POST",s),n=s=>(console.log("params===",s),o("/communications/getFollow","GET",s)),a=s=>o("/communications/deleteFollow","POST",s),m=s=>o("/communications/getFollows","GET",s),c=s=>o("/communications/getFollowsInfo","POST",s),i=s=>o("/communications/getFansInfo","POST",s),t=s=>o("/communications/getFans","GET",s),e=s=>o("/communications/setComment","POST",s),l=s=>(console.log("params=====================",s),o("/communications/getComment","GET",s)),u=s=>o("/communications/setLike","POST",s),T=s=>o("/communications/getLike","GET",s);export{s as a,n as b,e as c,a as d,l as e,m as f,T as g,t as h,c as i,i as j,u as s};