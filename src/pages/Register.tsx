
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';

const Register = () => {
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [verificationCode, setVerificationCode] = useState(['', '', '', '']);
  const [occupation, setOccupation] = useState('');
  const [educationLevel, setEducationLevel] = useState('');
  const [collegeDegree, setCollegeDegree] = useState('');
  const [rating, setRating] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');
  const [feedbackEmail, setFeedbackEmail] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep();
  };

  const nextStep = () => {
    if (step === 1) {
      // Validate form
      if (!fullName || !email || !phone || !password || !confirmPassword) {
        toast.error('Please fill all fields');
        return;
      }
      
      if (password !== confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }
      
      setStep(2);
    } else if (step === 2) {
      // Validate verification code
      if (verificationCode.some(code => !code)) {
        toast.error('Please enter the verification code');
        return;
      }
      
      setStep(3);
    } else if (step === 3) {
      // Validate occupation
      if (!occupation) {
        toast.error('Please select your occupation');
        return;
      }
      
      if (occupation === 'Students') {
        setStep(4);
      } else {
        setStep(5);
      }
    } else if (step === 4) {
      // Validate education level
      if (!educationLevel) {
        toast.error('Please select your education level');
        return;
      }
      
      if (educationLevel === 'College Students') {
        setStep(6);
      } else {
        setStep(5);
      }
    } else if (step === 5) {
      // Final step - feedback
      toast.success('Registration successful!');
      navigate('/login');
    } else if (step === 6) {
      // College degree selection
      if (!collegeDegree) {
        toast.error('Please select your college degree');
        return;
      }
      
      setStep(5);
    }
  };

  const handleVerificationCodeChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newVerificationCode = [...verificationCode];
      newVerificationCode[index] = value;
      setVerificationCode(newVerificationCode);
      
      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`verification-${index + 1}`);
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="w-full max-w-lg bg-blue-400/60 backdrop-blur-sm p-8 rounded-lg shadow-lg">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-2">Create Account</h1>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <Input
                  id="fullName"
                  type="text"
                  placeholder="FULL NAME"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="bg-white/90 border-none h-14 placeholder:text-gray-500 placeholder:font-medium text-gray-800"
                  required
                />
                
                <Input
                  id="email"
                  type="email"
                  placeholder="E-MAIL ADDRESS"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/90 border-none h-14 placeholder:text-gray-500 placeholder:font-medium text-gray-800"
                  required
                />
                
                <Input
                  id="phone"
                  type="tel"
                  placeholder="PHONE NUMBER"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-white/90 border-none h-14 placeholder:text-gray-500 placeholder:font-medium text-gray-800"
                  required
                />
                
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="PASSWORD"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white/90 border-none h-14 placeholder:text-gray-500 placeholder:font-medium text-gray-800 pr-10"
                    required
                  />
                  <button 
                    type="button"
                    className="absolute inset-y-0 right-3 flex items-center"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <EyeOff className="text-gray-500" size={20} />
                    ) : (
                      <Eye className="text-gray-500" size={20} />
                    )}
                  </button>
                </div>
                
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="CONFIRM PASSWORD"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-white/90 border-none h-14 placeholder:text-gray-500 placeholder:font-medium text-gray-800 pr-10"
                    required
                  />
                  <button 
                    type="button"
                    className="absolute inset-y-0 right-3 flex items-center"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="text-gray-500" size={20} />
                    ) : (
                      <Eye className="text-gray-500" size={20} />
                    )}
                  </button>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-blue-500 hover:bg-blue-600 rounded-full h-14 text-lg"
              >
                NEXT
              </Button>
            </form>
          </div>
        );
      case 2:
        return (
          <div className="w-full max-w-lg bg-blue-400/60 backdrop-blur-sm p-8 rounded-lg shadow-lg">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-4">Verification Code</h1>
              <p className="text-white text-xl">We have sent the verification code to your email address</p>
            </div>
            
            <div className="flex justify-center gap-4 my-12">
              {verificationCode.map((code, index) => (
                <Input
                  key={index}
                  id={`verification-${index}`}
                  type="text"
                  value={code}
                  onChange={(e) => handleVerificationCodeChange(index, e.target.value)}
                  className="bg-gray-200/80 border-none h-16 w-16 text-center text-2xl font-bold text-gray-800"
                  maxLength={1}
                />
              ))}
            </div>
            
            <Button 
              onClick={nextStep} 
              className="w-full bg-blue-500 hover:bg-blue-600 rounded-full h-14 text-lg mt-8"
            >
              Confirm
            </Button>
          </div>
        );
      case 3:
        return (
          <div className="w-full max-w-lg bg-blue-400/60 backdrop-blur-sm p-8 rounded-lg shadow-lg">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-white mb-2">Please select your occupation</h1>
            </div>
            
            <div className="space-y-4">
              {['Students', 'Professor\'s/Teacher\'s', 'Others'].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setOccupation(option);
                    nextStep();
                  }}
                  className="w-full bg-white/90 hover:bg-white text-gray-800 font-medium p-4 rounded-lg h-14 text-xl"
                >
                  {option}
                </button>
              ))}
            </div>
            
            <div className="mt-12">
              <Button 
                onClick={nextStep} 
                className="w-full bg-blue-500 hover:bg-blue-600 rounded-full h-14 text-lg"
                disabled={!occupation}
              >
                NEXT
              </Button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="w-full max-w-lg bg-blue-400/60 backdrop-blur-sm p-8 rounded-lg shadow-lg">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-2">Your are currently studying in :-</h1>
            </div>
            
            <div className="space-y-4 mt-6">
              {[
                'Class I-V',
                'Class VI-VIII',
                'Class IX-XII',
                'College Students',
                'Others'
              ].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setEducationLevel(option);
                    nextStep();
                  }}
                  className="w-full bg-white/90 hover:bg-white text-gray-800 font-medium p-4 rounded-lg h-14 text-xl"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );
      case 5:
        return (
          <div className="w-full max-w-lg bg-blue-400/60 backdrop-blur-sm p-8 rounded-lg shadow-lg">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-4">How likely are you to recommend our service to a friend or colleague?</h1>
            </div>
            
            <div className="flex justify-between mb-8">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <button
                  key={num}
                  onClick={() => setRating(num)}
                  className={`w-12 h-12 rounded-full text-lg font-bold ${
                    rating === num ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-white text-lg mb-2">What feature can we add to improve?</p>
                <Input
                  placeholder="We'd love to hear your suggestions...."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="bg-gray-200/80 border-none h-14"
                />
              </div>
              
              <div>
                <p className="text-white text-lg mb-2">Email (optional)</p>
                <Input
                  type="email"
                  placeholder="Someone@gmail.com"
                  value={feedbackEmail}
                  onChange={(e) => setFeedbackEmail(e.target.value)}
                  className="bg-gray-200/80 border-none h-14"
                />
              </div>
            </div>
            
            <Button 
              onClick={nextStep} 
              className="w-full bg-blue-700 hover:bg-blue-800 h-14 text-lg mt-8"
            >
              SEND FEEDBACK
            </Button>
            
            <div className="flex justify-center mt-8">
              <img 
                src="/lovable-uploads/629690ef-8967-449a-8d4d-454d885d4330.png" 
                alt="Robot assistant" 
                className="w-32 h-32 object-contain"
              />
            </div>
          </div>
        );
      case 6:
        return (
          <div className="w-full max-w-lg bg-blue-400/60 backdrop-blur-sm p-8 rounded-lg shadow-lg">
            <div className="text-center mb-6">
              <h1 className="text-4xl font-bold text-white mb-2">College Student's:-</h1>
              <h2 className="text-3xl font-bold text-white mt-4 mb-4">Course name</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              {['BSC', 'BCA', 'B.Tech', 'CA', 'BBA', 'Accountancy'].map((option) => (
                <button
                  key={option}
                  onClick={() => setCollegeDegree(option)}
                  className={`bg-gray-200/80 hover:bg-white text-gray-800 font-bold p-4 rounded-lg h-14 ${
                    collegeDegree === option ? 'ring-2 ring-blue-600 bg-white' : ''
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            
            <Input
              placeholder="Please mention your college degree......"
              value={collegeDegree === 'Other' ? collegeDegree : ''}
              onChange={(e) => collegeDegree === 'Other' && setCollegeDegree(e.target.value)}
              className="bg-gray-200/80 border-none h-14 mb-8"
            />
            
            <Button 
              onClick={nextStep} 
              className="w-full bg-blue-600 hover:bg-blue-700 rounded-lg h-14 text-lg"
            >
              Done
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 to-blue-500 flex items-center justify-center px-4 py-8">
      {renderStep()}
    </div>
  );
};

export default Register;
