import Agent from './agent';

const analyzeEndpoint = 'http://localhost:8081/api/v1/analyze';
const sendInterval = 5000;

window.document.addEventListener('DOMContentLoaded', function () {
  const agent = new Agent(analyzeEndpoint);
  agent.initRegularSend(sendInterval);
});