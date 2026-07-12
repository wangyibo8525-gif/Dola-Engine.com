// ===== หน้าจอดาวน์โหลดทรัพยากร =====
let progress = 0;
const progressFill = document.getElementById('progressFill');
const loaderText = document.getElementById('loaderText');
const loaderScreen = document.getElementById('loaderScreen');
const authPage = document.getElementById('authPage');

function updateLoader(){
  if(progress <= 100){
    progressFill.style.width = progress + '%';
    loaderText.textContent = progress + '%';
    progress++;
    setTimeout(updateLoader, 40);
  }else{
    loaderScreen.innerHTML = `
      <div style="font-size:4rem;">✅</div>
      <h2>ดาวน์โหลดเสร็จสิ้น!</h2>
    `;
    setTimeout(()=>{
      loaderScreen.style.opacity = '0';
      loaderScreen.style.transition = 'opacity .5s';
      setTimeout(()=>{
        loaderScreen.style.display = 'none';
        authPage.style.display = 'flex';
      },500);
    },1200);
  }
}
window.addEventListener('load', updateLoader);

// ===== เปลี่ยนแท็บ เข้าระบบ/สมัคร =====
function showTab(tab){
  const loginForm = document.getElementById('loginForm');
  const regForm = document.getElementById('registerForm');
  const tabs = document.querySelectorAll('.tabBtn');
  tabs.forEach(t=>t.classList.remove('active'));
  event.target.classList.add('active');
  if(tab === 'login'){
    loginForm.classList.add('active');
    regForm.classList.remove('active');
  }else{
    regForm.classList.add('active');
    loginForm.classList.remove('active');
  }
}

// ===== ระบบเข้าสู่ระบบ/สมัคร (บันทึกในเครื่องก่อน) =====
function loginEmail(e){
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const pass = document.getElementById('loginPass').value;
  localStorage.setItem('dolaUser', email);
  localStorage.setItem('dolaName', email.split('@')[0]);
  alert('เข้าสู่ระบบสำเร็จ!');
  window.location.href = 'engine.html';
}

function registerEmail(e){
  e.preventDefault();
  const name = document.getElementById('regName').value;
  const email = document.getElementById('regEmail').value;
  localStorage.setItem('dolaUser', email);
  localStorage.setItem('dolaName', name);
  alert('สมัครสมาชิกสำเร็จ!');
  window.location.href = 'engine.html';
}

// ===== ตรวจสอบการเข้าสู่ระบบในหน้าเอนจิน =====
if(window.location.pathname.includes('engine.html')){
  const user = localStorage.getItem('dolaUser');
  const name = localStorage.getItem('dolaName');
  if(!user) window.location.href = 'index.html';
  else document.getElementById('userName').textContent = name;
}

// ===== ออกจากระบบ =====
function logout(){
  localStorage.removeItem('dolaUser');
  localStorage.removeItem('dolaName');
  window.location.href = 'index.html';
}

// ===== เปิด/ปิด คู่มือการใช้งาน =====
function toggleGuide(){
  const guideBox = document.getElementById('guideBox');
  const guideOverlay = document.getElementById('guideOverlay');
  guideBox.classList.toggle('show');
  guideOverlay.classList.toggle('show');
}
