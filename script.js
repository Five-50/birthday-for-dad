// 粒子背景
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const colors = ['#ff6b6b', '#ffdd00', '#4ecdc4', '#44a08d', '#ff9ff3', '#f368e0'];
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.animationDuration = (10 + Math.random() * 10) + 's';
        particle.style.width = (5 + Math.random() * 10) + 'px';
        particle.style.height = particle.style.width;
        particlesContainer.appendChild(particle);
    }
}

// 照片轮播
const photos = [
    { url: 'images/huangshan1.jpg', caption: '黄山莲花峰 · 家庭登山' },
    { url: 'images/huangshan2.jpg', caption: '黄山美景 · 迎客松' },
    { url: 'images/jingdezhen1.jpg', caption: '景德镇 · 古镇夜景' },
    { url: 'images/jingdezhen2.jpg', caption: '景德镇 · 古村落' },
    { url: 'images/xinjiang.png', caption: '新疆 · 草原风光' }
];

let currentPhotoIndex = 0;

function showPhoto(index) {
    currentPhotoIndex = index;
    const photoElement = document.getElementById('current-photo');
    const captionElement = document.getElementById('photo-caption');

    // 预加载图片
    const img = new Image();
    img.onload = function() {
        photoElement.src = photos[index].url;
        photoElement.style.opacity = 1;
    };
    img.src = photos[index].url;

    // 立即更新文字
    captionElement.innerText = photos[index].caption;

    // 更新指示器
    document.querySelectorAll('.indicator').forEach((ind, i) => {
        ind.classList.toggle('active', i === index);
    });
}

function nextPhoto() {
    const nextIndex = (currentPhotoIndex + 1) % photos.length;
    showPhoto(nextIndex);
}

function prevPhoto() {
    const prevIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
    showPhoto(prevIndex);
}

function goToPhoto(index) {
    showPhoto(index);
}

// 自动轮播函数
let slideInterval = null;

function startSlideShow() {
    if (slideInterval) clearInterval(slideInterval);
    slideInterval = setInterval(nextPhoto, 5000);
}

// 祝福墙功能
function addWish() {
    const input = document.getElementById('wish-input');
    const wishText = input.value.trim();
    
    if (!wishText) {
        alert('请输入祝福内容！');
        return;
    }
    
    const wishesWall = document.getElementById('wishes-wall');
    const newWish = document.createElement('div');
    newWish.className = 'wish-card';
    newWish.innerHTML = `
        <div class="wish-avatar">💝</div>
        <div class="wish-content">
            <h4>家人</h4>
            <p>${wishText}</p>
        </div>
        <div class="wish-time">刚刚</div>
    `;
    
    wishesWall.prepend(newWish);
    input.value = '';
    
    // 添加动画效果
    newWish.style.animation = 'pop 0.5s ease';
}

// 彩带效果
function showConfetti() {
    const container = document.getElementById('confetti-container');
    container.style.display = 'block';
    
    const colors = ['#ff6b6b', '#ffdd00', '#4ecdc4', '#44a08d', '#ff9ff3', '#f368e0', '#ffffff'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        confetti.style.animationDuration = (2 + Math.random() * 2) + 's';
        confetti.style.width = (5 + Math.random() * 15) + 'px';
        confetti.style.height = confetti.style.width;
        container.appendChild(confetti);
    }
    
    setTimeout(() => {
        container.innerHTML = '';
        container.style.display = 'none';
    }, 3000);
}

// 趣味游戏
let gameScore = 0;
let gameTime = 30;
let gameInterval = null;
let spawnInterval = null;
let isPlaying = false;

const gameIcons = [
    { emoji: '🏀', points: 10 },
    { emoji: '🏓', points: 15 },
    { emoji: '🏸', points: 20 },
    { emoji: '🎱', points: 25 }
];

function startGame() {
    gameScore = 0;
    gameTime = 30;
    isPlaying = true;
    
    document.getElementById('score').innerText = gameScore;
    document.getElementById('time').innerText = gameTime;
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('game-over-screen').style.display = 'none';
    
    // 游戏计时器
    gameInterval = setInterval(() => {
        gameTime--;
        document.getElementById('time').innerText = gameTime;
        
        if (gameTime <= 0) {
            endGame();
        }
    }, 1000);
    
    // 生成运动图标
    spawnInterval = setInterval(spawnGameIcon, 800);
}

function spawnGameIcon() {
    if (!isPlaying) return;
    
    const gameArea = document.getElementById('game-area');
    const icon = gameIcons[Math.floor(Math.random() * gameIcons.length)];
    const gameIcon = document.createElement('div');
    gameIcon.className = 'game-icon';
    gameIcon.innerText = icon.emoji;
    gameIcon.style.left = (Math.random() * 80 + 10) + '%';
    gameIcon.style.top = (Math.random() * 70 + 10) + '%';
    
    gameIcon.onclick = () => {
        gameScore += icon.points;
        document.getElementById('score').innerText = gameScore;
        gameIcon.style.transform = 'scale(2)';
        gameIcon.style.opacity = '0';
        setTimeout(() => {
            gameArea.removeChild(gameIcon);
        }, 200);
    };
    
    gameArea.appendChild(gameIcon);
    
    // 自动移除图标
    setTimeout(() => {
        if (gameIcon.parentElement) {
            gameIcon.style.opacity = '0';
            setTimeout(() => {
                if (gameIcon.parentElement) {
                    gameArea.removeChild(gameIcon);
                }
            }, 300);
        }
    }, 2000);
}

function endGame() {
    isPlaying = false;
    clearInterval(gameInterval);
    clearInterval(spawnInterval);
    
    document.getElementById('final-score').innerText = gameScore;
    document.getElementById('game-over-screen').style.display = 'block';
    
    // 清空游戏区域
    const gameArea = document.getElementById('game-area');
    const icons = gameArea.querySelectorAll('.game-icon');
    icons.forEach(icon => icon.remove());
}

function restartGame() {
    startGame();
}

// 导航栏高亮
function setActiveNav() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop - 100 && window.scrollY < sectionTop + sectionHeight - 100) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentSection)) {
                link.classList.add('active');
            }
        });
    });
}

// 点击屏幕出现祝福语
function addClickEffects() {
    const wishes = [
        '❤️ 爸爸我爱你！',
        '🎉 生日快乐！（迟到版）',
        '💪 身体健康！',
        '🌟 永远年轻！',
        '💰 财源滚滚！',
        '😊 少劳累多快乐！',
        '🍀 轻松赚钱！',
        '🎊 天天开心！',
        '😜 迟到的祝福更真诚！',
        '🎂 生日蛋糕补一个！',
        '🚀 新的一岁冲冲冲！',
        '😎 爸爸永远最帅！',
        '🍕 今晚加餐！',
        '🎁 礼物在路上！',
        '🙈 假装今天是生日！'
    ];
    
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('surprise-btn') || 
            e.target.classList.contains('game-icon') ||
            e.target.classList.contains('wish-btn')) {
            return;
        }
        
        const text = document.createElement('span');
        text.style.position = 'fixed';
        text.style.left = e.clientX + 'px';
        text.style.top = e.clientY + 'px';
        text.style.color = '#fff';
        text.style.fontSize = '1.5rem';
        text.style.fontFamily = 'Ma Shan Zheng, cursive';
        text.style.pointerEvents = 'none';
        text.style.zIndex = '1000';
        text.style.animation = 'float-up 2s ease-out forwards';
        text.innerText = wishes[Math.floor(Math.random() * wishes.length)];
        
        document.body.appendChild(text);
        
        setTimeout(() => {
            document.body.removeChild(text);
        }, 2000);
    });
}

// 添加浮动动画
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes float-up {
        0% {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) scale(1.5);
            opacity: 0;
        }
    }
`;
document.head.appendChild(styleSheet);

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    setActiveNav();
    addClickEffects();
    
    // 初始化第一张照片并开始轮播
    showPhoto(0);
    startSlideShow();
    
    // 添加键盘事件
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevPhoto();
        } else if (e.key === 'ArrowRight') {
            nextPhoto();
        }
    });
});
