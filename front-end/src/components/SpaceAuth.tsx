import React, { useState, useEffect } from 'react';
import { Rocket, Mail, Lock, Star, Moon, User } from 'lucide-react';

interface SpaceAuthProps {
  onLogin: (userData: { name: string; email: string }) => void;
}

export default function SpaceAuth({ onLogin }: SpaceAuthProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email || !password) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    
    if (!isLogin && !name) {
      alert('Por favor, preencha o nome completo.');
      return;
    }

    const userData = {
      name: isLogin ? 'Usuário' : name,
      email: email
    };

    console.log(isLogin ? 'Login' : 'Cadastro', userData);
    onLogin(userData);
  };

  // Criar estrelas estáticas
  const createStars = (): React.ReactElement[] => {
    const stars: React.ReactElement[] = [];
    for (let i = 0; i < 100; i++) {
      stars.push(
        <div
          key={i}
          style={{
            position: 'absolute',
            width: Math.random() * 3 + 1 + 'px',
            height: Math.random() * 3 + 1 + 'px',
            backgroundColor: 'white',
            borderRadius: '50%',
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
            opacity: Math.random() * 0.8 + 0.2,
            animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
            animationDelay: Math.random() * 3 + 's'
          }}
        />
      );
    }
    return stars;
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#000000',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: windowWidth < 768 ? '8px' : '16px',
      overflow: 'hidden'
    }}>
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        @media (max-width: 480px) {
          .auth-card {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            border-radius: 16px !important;
          }
          
          .auth-header {
            padding: 16px !important;
          }
          
          .auth-title {
            font-size: 20px !important;
          }
          
          .auth-subtitle {
            font-size: 12px !important;
          }
          
          .auth-form {
            padding: 0 16px 16px !important;
          }
          
          .auth-input {
            padding: 10px 10px 10px 40px !important;
            font-size: 14px !important;
          }
          
          .auth-button {
            padding: 10px !important;
            font-size: 14px !important;
          }
          
          .auth-toggle {
            margin: 16px !important;
            padding: 6px !important;
          }
          
          .auth-toggle button {
            padding: 6px 12px !important;
            font-size: 12px !important;
          }
          
          .auth-social {
            grid-template-columns: 1fr !important;
            gap: 8px !important;
          }
          
          .auth-social button {
            padding: 10px !important;
            font-size: 14px !important;
          }
        }
        
        @media (min-width: 481px) and (max-width: 768px) {
          .auth-card {
            width: 90% !important;
            max-width: 400px !important;
          }
          
          .auth-header {
            padding: 20px !important;
          }
          
          .auth-title {
            font-size: 22px !important;
          }
          
          .auth-form {
            padding: 0 20px 20px !important;
          }
        }
        
        @media (min-width: 769px) {
          .auth-card {
            width: 100% !important;
            max-width: 420px !important;
          }
        }
        
        @media (min-width: 1024px) {
          .auth-card {
            max-width: 450px !important;
          }
          
          .auth-header {
            padding: 28px !important;
          }
          
          .auth-title {
            font-size: 28px !important;
          }
          
          .auth-subtitle {
            font-size: 16px !important;
          }
        }
      `}</style>
      
      {/* Estrelas */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
        {createStars()}
      </div>

      {/* Planetas decorativos */}
      <div style={{
        position: 'absolute',
        top: windowWidth < 768 ? '40px' : '80px',
        left: windowWidth < 768 ? '20px' : '40px',
        width: windowWidth < 768 ? '80px' : '120px',
        height: windowWidth < 768 ? '80px' : '120px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '50%',
        filter: 'blur(40px)',
        opacity: 0.3
      }}></div>
      
      <div style={{
        position: 'absolute',
        bottom: windowWidth < 768 ? '40px' : '80px',
        right: windowWidth < 768 ? '20px' : '40px',
        width: windowWidth < 768 ? '100px' : '150px',
        height: windowWidth < 768 ? '100px' : '150px',
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        borderRadius: '50%',
        filter: 'blur(50px)',
        opacity: 0.2
      }}></div>

      {/* Card principal */}
      <div 
        className="auth-card"
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: '400px',
          backgroundColor: '#09090b',
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          overflow: 'hidden'
        }}
      >
        
        {/* Header */}
        <div 
          className="auth-header"
          style={{
            backgroundColor: 'white',
            padding: '24px',
            textAlign: 'center',
            position: 'relative'
          }}
        >
          <Rocket style={{
            width: windowWidth < 768 ? '40px' : '48px',
            height: windowWidth < 768 ? '40px' : '48px',
            margin: '0 auto 12px',
            color: 'black',
            animation: 'bounce 2s infinite'
          }} />
          <h1 
            className="auth-title"
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'black',
              margin: '0 0 4px',
              fontFamily: 'system-ui, sans-serif'
            }}
          >
            Exoplanet Hub
          </h1>
          <p 
            className="auth-subtitle"
            style={{
              color: '#666',
              fontSize: '14px',
              margin: 0,
              fontFamily: 'system-ui, sans-serif'
            }}
          >
            Descubra mundos além do nosso sistema solar
          </p>
        </div>

        {/* Toggle */}
        <div 
          className="auth-toggle"
          style={{
            display: 'flex',
            padding: '8px',
            margin: '24px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '50px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <button
            onClick={() => setIsLogin(true)}
            style={{
              flex: 1,
              padding: '8px 16px',
              borderRadius: '50px',
              border: 'none',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.3s',
              backgroundColor: isLogin ? 'white' : 'transparent',
              color: isLogin ? 'black' : '#999'
            }}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            style={{
              flex: 1,
              padding: '8px 16px',
              borderRadius: '50px',
              border: 'none',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.3s',
              backgroundColor: !isLogin ? 'white' : 'transparent',
              color: !isLogin ? 'black' : '#999'
            }}
          >
            Cadastro
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="auth-form" style={{ padding: '0 24px 24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {!isLogin && (
              <div style={{ position: 'relative' }}>
                <User style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '20px',
                  height: '20px',
                  color: '#999'
                }} />
                <input
                  type="text"
                  placeholder="Nome completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="auth-input"
                  style={{
                    width: '100%',
                    padding: '12px 12px 12px 48px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    color: 'white',
                    fontSize: '16px',
                    outline: 'none',
                    fontFamily: 'system-ui, sans-serif'
                  }}
                />
              </div>
            )}

            <div style={{ position: 'relative' }}>
              <Mail style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '20px',
                height: '20px',
                color: '#999'
              }} />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="auth-input"
                style={{
                  width: '100%',
                  padding: '12px 12px 12px 48px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  color: 'white',
                  fontSize: '16px',
                  outline: 'none',
                  fontFamily: 'system-ui, sans-serif'
                }}
                required
              />
            </div>

            <div style={{ position: 'relative' }}>
              <Lock style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '20px',
                height: '20px',
                color: '#999'
              }} />
              <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="auth-input"
                style={{
                  width: '100%',
                  padding: '12px 12px 12px 48px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  color: 'white',
                  fontSize: '16px',
                  outline: 'none',
                  fontFamily: 'system-ui, sans-serif'
                }}
                required
              />
            </div>

            {isLogin && (
              <div style={{ textAlign: 'right' }}>
                <button
                  type="button"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#999',
                    fontSize: '14px',
                    cursor: 'pointer',
                    fontFamily: 'system-ui, sans-serif'
                  }}
                >
                  Esqueceu a senha?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="auth-button"
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: 'white',
                color: 'black',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontFamily: 'system-ui, sans-serif',
                transition: 'all 0.3s'
              }}
            >
              {isLogin ? 'Sair da órbita' : 'Iniciar jornada'}
              <Rocket style={{ width: '20px', height: '20px' }} />
            </button>
          </div>
        </form>

        {/* Footer */}
        <div style={{ padding: '0 24px 24px' }}>
          <div style={{ position: 'relative', marginBottom: '16px' }}>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              right: 0,
              height: '1px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)'
            }}></div>
            <div style={{
              position: 'relative',
              textAlign: 'center',
              fontSize: '14px',
              color: '#999',
              backgroundColor: '#09090b',
              padding: '0 16px',
              fontFamily: 'system-ui, sans-serif'
            }}>
              ou continue com
            </div>
          </div>

          <div className="auth-social" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
            <button style={{
              padding: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              color: 'white',
              fontSize: '14px',
              cursor: 'pointer',
              fontFamily: 'system-ui, sans-serif'
            }}>
              Google
            </button>
            <button style={{
              padding: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              color: 'white',
              fontSize: '14px',
              cursor: 'pointer',
              fontFamily: 'system-ui, sans-serif'
            }}>
              GitHub
            </button>
            <button style={{
              padding: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              color: 'white',
              fontSize: '14px',
              cursor: 'pointer',
              fontFamily: 'system-ui, sans-serif'
            }}>
              Apple
            </button>
          </div>
        </div>

        {/* Texto final */}
        <div style={{
          textAlign: 'center',
          padding: '0 24px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          fontSize: '14px',
          color: '#999',
          fontFamily: 'system-ui, sans-serif'
        }}>
          <Moon style={{ width: '16px', height: '16px' }} />
          Protegido por tecnologia galáctica
        </div>
      </div>
    </div>
  );
}