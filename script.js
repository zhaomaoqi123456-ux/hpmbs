//tsParticles library - https://github.com/matteobruni/tsparticles

let particlesInitialized = false;
let audioPlaying = false;

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
  const startButton = document.getElementById('startButton');
  const audio = document.getElementById('birthdayAudio');
  const particlesContainer = document.getElementById('tsparticles');
  
  // 移动端触摸事件支持
  startButton.addEventListener('click', startCelebration);
  startButton.addEventListener('touchend', function(e) {
    e.preventDefault(); // 防止触摸后的鼠标事件触发
    startCelebration();
  });
  
  function startCelebration() {
    // 隐藏开始按钮
    startButton.style.display = 'none';
    
    // 播放音乐（处理移动端自动播放限制）
    playAudio(audio);
    
    // 初始化粒子动画
    if (!particlesInitialized) {
      initializeParticles();
      particlesInitialized = true;
    }
    
    // 显示粒子容器
    particlesContainer.classList.add('active');
  }
  
  function playAudio(audioElement) {
    // 处理移动端自动播放限制
    const playPromise = audioElement.play();
    
    if (playPromise !== undefined) {
      playPromise.then(() => {
        audioPlaying = true;
        audioElement.loop = true;
      }).catch(error => {
        // 自动播放被阻止，显示提示
        console.log('自动播放被阻止，需要用户交互');
        startButton.textContent = '点击播放音乐';
        startButton.style.display = 'block';
        
        // 添加一次性点击事件来播放音乐
        const playOnClick = function() {
          audioElement.play().then(() => {
            audioElement.loop = true;
            audioPlaying = true;
            startButton.style.display = 'none';
            if (!particlesInitialized) {
              initializeParticles();
              particlesInitialized = true;
            }
            particlesContainer.classList.add('active');
          });
          startButton.removeEventListener('click', playOnClick);
          startButton.removeEventListener('touchend', playOnClick);
        };
        
        startButton.addEventListener('click', playOnClick);
        startButton.addEventListener('touchend', function(e) {
          e.preventDefault();
          playOnClick();
        });
      });
    }
  }
  
  function initializeParticles() {
    tsParticles.load("tsparticles", {
      fullScreen: {
        enable: true
      },
      detectRetina: true,
      background: {
        color: "#000"
      },
      fpsLimit: 60,
      emitters: {
        direction: "top",
        life: {
          count: 0,
          duration: 0.1,
          delay: 0.1
        },
        rate: {
          delay: 0.01,
          quantity: 1
        },
        size: {
          width: 100,
          height: 0
        },
        position: {
          y: 100,
          x: 50
        }
      },
      particles: {
        number: {
          value: 0
        },
        destroy: {
          mode: "split",
          split: {
            count: 1,
            factor: { value: 1 / 3 },
            rate: {
              value: 100
            },
            particles: {
              color: {
                value: ["#5bc0eb", "#fde74c", "#9bc53d", "#e55934", "#fa7921"]
              },
              stroke: {
                width: 0
              },
              number: {
                value: 0
              },
              collisions: {
                enable: false
              },
              opacity: {
                value: 1,
                animation: {
                  enable: true,
                  speed: 0.6,
                  minimumValue: 0.1,
                  sync: false,
                  startValue: "max",
                  destroy: "min"
                }
              },
              shape: {
                type: "circle"
              },
              size: {
                value: { min: 2, max: 3 },
                animation: {
                  enable: false
                }
              },
              life: {
                count: 1,
                duration: {
                  value: {
                    min: 1,
                    max: 2
                  }
                }
              },
              move: {
                enable: true,
                gravity: {
                  enable: false
                },
                speed: 2,
                direction: "none",
                random: true,
                straight: false,
                outMode: "destroy"
              }
            }
          }
        },
        life: {
          count: 1
        },
        shape: {
          type: "line"
        },
        size: {
          value: { min: 1, max: 100 },
          animation: {
            enable: true,
            sync: true,
            speed: 150,
            startValue: "random",
            destroy: "min"
          }
        },
        stroke: {
          color: {
            value: "#303030"
          },
          width: 1
        },
        rotate: {
          path: true
        },
        move: {
          enable: true,
          gravity: {
            acceleration: 15,
            enable: true,
            inverse: true,
            maxSpeed: 100
          },
          speed: { min: 10, max: 20 },
          outModes: {
            default: "destroy",
            top: "none"
          },
          trail: {
            fillColor: "#000",
            enable: true,
            length: 10
          }
        }
      }
    });
  }
});