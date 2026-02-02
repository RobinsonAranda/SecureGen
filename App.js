import React, { useState, useEffect } from 'react';
import { Copy, RefreshCw, Shield, Lock, AlertTriangle } from 'lucide-react';

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);
  const [strength, setStrength] = useState(0);

  const generatePassword = () => {
    let charset = '';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (charset === '') {
      setPassword('');
      return;
    }

    let newPassword = '';
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    
    for (let i = 0; i < length; i++) {
      newPassword += charset[array[i] % charset.length];
    }
    
    setPassword(newPassword);
    setCopied(false);
  };

  const calculateStrength = () => {
    if (!password) return 0;
    
    let score = 0;
    const checks = [
      password.length >= 12,
      password.length >= 16,
      /[a-z]/.test(password),
      /[A-Z]/.test(password),
      /[0-9]/.test(password),
      /[^a-zA-Z0-9]/.test(password),
      password.length >= 20
    ];
    
    score = checks.filter(Boolean).length;
    return Math.min((score / 7) * 100, 100);
  };

  useEffect(() => {
    generatePassword();
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  useEffect(() => {
    setStrength(calculateStrength());
  }, [password]);

  const copyToClipboard = async () => {
    if (!password) return;
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStrengthLabel = () => {
    if (strength < 30) return { label: 'DÉBIL', color: '#ff3366' };
    if (strength < 60) return { label: 'MEDIA', color: '#ffaa00' };
    if (strength < 85) return { label: 'FUERTE', color: '#00ff88' };
    return { label: 'MÁXIMA', color: '#00ffff' };
  };

  const strengthInfo = getStrengthLabel();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: '"JetBrains Mono", "Courier New", monospace',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated background effect */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 20% 50%, rgba(0, 255, 136, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(0, 255, 255, 0.1) 0%, transparent 50%)',
        animation: 'pulse 8s ease-in-out infinite',
        pointerEvents: 'none'
      }} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap');
        
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(0, 255, 136, 0.3), 0 0 40px rgba(0, 255, 136, 0.1); }
          50% { box-shadow: 0 0 30px rgba(0, 255, 136, 0.5), 0 0 60px rgba(0, 255, 136, 0.2); }
        }
        
        .password-display {
          transition: all 0.3s ease;
        }
        
        .password-display:hover {
          transform: scale(1.02);
          box-shadow: 0 0 40px rgba(0, 255, 136, 0.4);
        }
        
        .strength-bar {
          transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
          background: transparent;
          cursor: pointer;
        }
        
        input[type="range"]::-webkit-slider-track {
          background: linear-gradient(90deg, rgba(0, 255, 136, 0.2), rgba(0, 255, 255, 0.2));
          height: 8px;
          border-radius: 4px;
          border: 1px solid rgba(0, 255, 136, 0.3);
        }
        
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          background: #00ff88;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          margin-top: -6px;
          box-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
          transition: all 0.2s ease;
        }
        
        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 0 20px rgba(0, 255, 136, 0.8);
        }
        
        input[type="range"]::-moz-range-track {
          background: linear-gradient(90deg, rgba(0, 255, 136, 0.2), rgba(0, 255, 255, 0.2));
          height: 8px;
          border-radius: 4px;
          border: 1px solid rgba(0, 255, 136, 0.3);
        }
        
        input[type="range"]::-moz-range-thumb {
          background: #00ff88;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          border: none;
          box-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
        }
        
        .checkbox-container {
          position: relative;
          cursor: pointer;
          user-select: none;
        }
        
        .checkbox-container input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
        }
        
        .checkmark {
          position: absolute;
          left: 0;
          height: 20px;
          width: 20px;
          background-color: rgba(255, 255, 255, 0.05);
          border: 2px solid rgba(0, 255, 136, 0.3);
          border-radius: 4px;
          transition: all 0.3s ease;
        }
        
        .checkbox-container:hover .checkmark {
          border-color: #00ff88;
          background-color: rgba(0, 255, 136, 0.1);
        }
        
        .checkbox-container input:checked ~ .checkmark {
          background-color: #00ff88;
          border-color: #00ff88;
        }
        
        .checkmark:after {
          content: "";
          position: absolute;
          display: none;
          left: 5px;
          top: 2px;
          width: 5px;
          height: 10px;
          border: solid #0a0a0a;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }
        
        .checkbox-container input:checked ~ .checkmark:after {
          display: block;
        }
      `}</style>

      <div style={{
        maxWidth: '600px',
        width: '100%',
        animation: 'slideIn 0.6s ease-out',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '16px'
          }}>
            <Shield size={36} color="#00ff88" />
            <h1 style={{
              fontSize: '32px',
              fontWeight: 700,
              color: '#ffffff',
              margin: 0,
              letterSpacing: '2px',
              textTransform: 'uppercase'
            }}>
              SecureGen
            </h1>
          </div>
          <p style={{
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: '14px',
            margin: 0,
            letterSpacing: '1px'
          }}>
            GENERADOR DE CONTRASEÑAS ULTRA-SEGURAS
          </p>
        </div>

        {/* Password Display */}
        <div className="password-display" style={{
          background: 'rgba(0, 0, 0, 0.5)',
          border: '2px solid rgba(0, 255, 136, 0.3)',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '30px',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '16px'
          }}>
            <input
              type="text"
              value={password}
              readOnly
              style={{
                flex: 1,
                background: 'rgba(0, 255, 136, 0.05)',
                border: '1px solid rgba(0, 255, 136, 0.2)',
                borderRadius: '8px',
                padding: '16px',
                color: '#00ff88',
                fontSize: '18px',
                fontFamily: 'inherit',
                letterSpacing: '2px',
                outline: 'none'
              }}
            />
            <button
              onClick={copyToClipboard}
              style={{
                background: copied ? '#00ff88' : 'rgba(0, 255, 136, 0.1)',
                border: `2px solid ${copied ? '#00ff88' : 'rgba(0, 255, 136, 0.3)'}`,
                borderRadius: '8px',
                padding: '16px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Copy size={20} color={copied ? '#0a0a0a' : '#00ff88'} />
            </button>
            <button
              onClick={generatePassword}
              style={{
                background: 'rgba(0, 255, 255, 0.1)',
                border: '2px solid rgba(0, 255, 255, 0.3)',
                borderRadius: '8px',
                padding: '16px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(0, 255, 255, 0.2)';
                e.currentTarget.style.borderColor = '#00ffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(0, 255, 255, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(0, 255, 255, 0.3)';
              }}
            >
              <RefreshCw size={20} color="#00ffff" />
            </button>
          </div>

          {/* Strength Indicator */}
          <div style={{ marginTop: '16px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '8px'
            }}>
              <span style={{
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: '12px',
                letterSpacing: '1px'
              }}>
                FORTALEZA
              </span>
              <span style={{
                color: strengthInfo.color,
                fontSize: '14px',
                fontWeight: 700,
                letterSpacing: '1px'
              }}>
                {strengthInfo.label}
              </span>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              height: '8px',
              borderRadius: '4px',
              overflow: 'hidden',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div className="strength-bar" style={{
                width: `${strength}%`,
                height: '100%',
                background: `linear-gradient(90deg, ${strengthInfo.color}, ${strengthInfo.color}dd)`,
                boxShadow: `0 0 10px ${strengthInfo.color}66`
              }} />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.5)',
          border: '2px solid rgba(0, 255, 136, 0.2)',
          borderRadius: '12px',
          padding: '24px',
          backdropFilter: 'blur(10px)'
        }}>
          {/* Length Slider */}
          <div style={{ marginBottom: '28px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '12px'
            }}>
              <label style={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '14px',
                letterSpacing: '1px'
              }}>
                LONGITUD
              </label>
              <span style={{
                color: '#00ff88',
                fontSize: '20px',
                fontWeight: 700,
                minWidth: '40px',
                textAlign: 'right'
              }}>
                {length}
              </span>
            </div>
            <input
              type="range"
              min="8"
              max="32"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          {/* Character Options */}
          <div style={{
            display: 'grid',
            gap: '16px'
          }}>
            <label className="checkbox-container" style={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '14px',
              paddingLeft: '32px',
              letterSpacing: '0.5px',
              display: 'flex',
              alignItems: 'center',
              minHeight: '20px'
            }}>
              <input
                type="checkbox"
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
              />
              <span className="checkmark"></span>
              MAYÚSCULAS (A-Z)
            </label>

            <label className="checkbox-container" style={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '14px',
              paddingLeft: '32px',
              letterSpacing: '0.5px',
              display: 'flex',
              alignItems: 'center',
              minHeight: '20px'
            }}>
              <input
                type="checkbox"
                checked={includeLowercase}
                onChange={(e) => setIncludeLowercase(e.target.checked)}
              />
              <span className="checkmark"></span>
              MINÚSCULAS (a-z)
            </label>

            <label className="checkbox-container" style={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '14px',
              paddingLeft: '32px',
              letterSpacing: '0.5px',
              display: 'flex',
              alignItems: 'center',
              minHeight: '20px'
            }}>
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
              />
              <span className="checkmark"></span>
              NÚMEROS (0-9)
            </label>

            <label className="checkbox-container" style={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '14px',
              paddingLeft: '32px',
              letterSpacing: '0.5px',
              display: 'flex',
              alignItems: 'center',
              minHeight: '20px'
            }}>
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
              />
              <span className="checkmark"></span>
              SÍMBOLOS (!@#$%^&*)
            </label>
          </div>
        </div>

        {/* Footer Info */}
        <div style={{
          marginTop: '24px',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          color: 'rgba(255, 255, 255, 0.4)',
          fontSize: '12px',
          letterSpacing: '1px'
        }}>
          <Lock size={14} />
          <span>GENERADO CON CRIPTOGRAFÍA SEGURA</span>
        </div>
      </div>
    </div>
  );
}
