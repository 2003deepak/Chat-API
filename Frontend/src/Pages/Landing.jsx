import React from 'react';
import { Bot, MessageSquare, Brain, Clock, Globe, Shield, Star } from 'lucide-react';

const Landing = () => {
  return (
    <>
      <div className="relative overflow-hidden bg-gradient-to-b from-indigo-100 to-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-8 flex justify-center">
              <Bot className="h-16 w-16 text-indigo-600" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              AI-Powered Conversations Made Simple
              
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Transform your customer experience with our intelligent chatbot. Available 24/7, powered by cutting-edge AI technology.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button className="rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
                Get Started
              </button>
              <button className="text-sm font-semibold leading-6 text-gray-900 flex items-center">
                Live Demo <MessageSquare className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">Powerful Features</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need for intelligent customer support
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-7xl sm:mt-20 lg:mt-24">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-4">
              {[
                {
                  name: 'AI-Powered Intelligence',
                  description: 'Advanced natural language processing for human-like conversations.',
                  icon: Brain,
                },
                {
                  name: '24/7 Availability',
                  description: 'Always online to assist your customers whenever they need help.',
                  icon: Clock,
                },
                {
                  name: 'Multilingual Support',
                  description: 'Communicate with customers in multiple languages seamlessly.',
                  icon: Globe,
                },
                {
                  name: 'Enterprise Security',
                  description: 'Bank-grade encryption and data protection for peace of mind.',
                  icon: Shield,
                },
              ].map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                      <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <div className="bg-indigo-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-lg font-semibold leading-8 tracking-tight text-indigo-600">Testimonials</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Trusted by thousands of companies worldwide
            </p>
          </div>
          <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-2xl bg-white p-8 shadow-lg">
                  <div className="flex gap-x-1 text-indigo-600">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                  <p className="mt-4 text-lg font-semibold leading-6 text-gray-900">
                    "The chatbot has revolutionized our customer service"
                  </p>
                  <p className="mt-3 text-base leading-7 text-gray-600">
                    Implementing this chatbot has reduced our response time by 80% and improved customer satisfaction significantly.
                  </p>
                  <div className="mt-6 flex items-center gap-x-4">
                    <img
                      className="h-10 w-10 rounded-full bg-gray-50"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=300&h=300"
                      alt=""
                    />
                    <div>
                      <h3 className="text-sm font-semibold leading-6 text-gray-900">John Smith</h3>
                      <p className="text-sm leading-6 text-gray-600">CEO at TechCorp</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
