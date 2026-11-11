const c=window.SITE_CONFIG||{};
document.querySelectorAll('[data-config]').forEach(el=>{const k=el.dataset.config,v=c[k]||'';if(v){el.textContent=v;if(el.tagName==='A')el.href=k==='email'?`mailto:${v}`:`tel:${v.replace(/\s/g,'')}`}});
document.querySelectorAll('[data-optional]').forEach(el=>{if(!c[el.dataset.optional])el.hidden=true});
const header=document.querySelector('.header'),menu=document.querySelector('.menu');
menu.addEventListener('click',()=>{const open=header.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));document.body.classList.toggle('no-scroll',open)});
document.querySelectorAll('.header nav a').forEach(a=>a.addEventListener('click',()=>{header.classList.remove('open');document.body.classList.remove('no-scroll');menu.setAttribute('aria-expanded','false')}));
const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(!e.isIntersecting)return;e.target.classList.add('visible');if(e.target.dataset.count&&!e.target.dataset.done){const end=+e.target.dataset.count;let n=0;const timer=setInterval(()=>{n=Math.min(end,n+Math.max(1,Math.ceil(end/28)));e.target.textContent=n;if(n===end)clearInterval(timer)},35);e.target.dataset.done='1'}if(e.target.classList.contains('dial'))e.target.classList.add('animate')}),{threshold:.2});
document.querySelectorAll('.reveal,[data-count],.dial').forEach(x=>io.observe(x));
document.getElementById('year').textContent=new Date().getFullYear();
/* =========================================
   COMPANY / INDIVIDUAL FORM BEHAVIOR
   ========================================= */

const customerType =
    document.getElementById('customerType');

const companyField =
    document.getElementById('companyField');

const companyInput =
    document.getElementById('companyInput');


if (customerType && companyField && companyInput) {

    const updateCustomerType = () => {

        const isIndividual =
            customerType.value === 'Individual';


        /* Hide Company for Individual */

        companyField.style.display =
            isIndividual ? 'none' : 'block';


        /* Company must not remain required
           when the field is hidden */

        companyInput.required =
            !isIndividual;


        /* Do not submit hidden Company field */

        companyInput.disabled =
            isIndividual;


        /* Remove any previously entered
           Company value */

        if (isIndividual) {
            companyInput.value = '';
        }

    };


    customerType.addEventListener(
        'change',
        updateCustomerType
    );


    /* Correct state on initial page load */

    updateCustomerType();

}

const form=document.getElementById('enquiry');


form.addEventListener('submit',async e=>{e.preventDefault();const status=form.querySelector('.form-status');if(!form.reportValidity())return;const data=Object.fromEntries(new FormData(form));status.textContent='Submitting…';try{if(c.formEndpoint){const r=await fetch(c.formEndpoint,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(data)});if(!r.ok)throw new Error();status.textContent='Thank you. Your requirement has been submitted.';form.reset()}else if(c.email){const body=Object.entries(data).map(([k,v])=>`${k}: ${v}`).join('\n');location.href=`mailto:${c.email}?subject=${encodeURIComponent('Manpower requirement from '+data.company)}&body=${encodeURIComponent(body)}`;status.textContent='Your email application has opened.'}else{status.textContent='Contact email or form endpoint is not configured yet. Update assets/js/config.js.'}}catch{status.textContent='The form could not be submitted. Please try again or contact us directly.'}});
/* Visitor Counter */

const visitorCount = document.getElementById('visitor-count');

if(visitorCount){

    fetch('https://countapi.mileshilliard.com/api/v1/hit/daraksha-overseas-llp-site-visits-2026')

    .then(response => {
        if(!response.ok){
            throw new Error('Visitor counter unavailable');
        }
        return response.json();
    })

    .then(data => {
        visitorCount.textContent =
            Number(data.value).toLocaleString('en-IN');
    })

    .catch(error => {
        console.warn('Visitor counter error:', error);
        visitorCount.textContent = '—';
    });
}
