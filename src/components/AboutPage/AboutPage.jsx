import React from 'react';

function AboutPage() {
  return (
    <div className="container">
      <h1>About KinRx</h1>
      <ul>
        <li><strong>Personalized medicine organizer</strong> for your family – track prescriptions, doses and timing with ease.</li>
        <li>Say goodbye to the med management juggling act – KinRx makes it simple and stress-free.</li>
        <li>Perfect for everyone from <strong>grandma to teens</strong>, ensuring all medications are on schedule.</li>
        <li>Focus on what really matters: <strong>providing care</strong> – we’ll handle the rest!</li>
      </ul>

    <h2>The Technology Behind KinRx</h2>
    <p>Our application is powered by a robust stack of modern technologies that make KinRx reliable, efficient, and easy to use.</p>
  
    <h3>Technologies Used</h3>
    <ul>
      <li><strong>Front End:</strong>
        <ul>
          <li>React – for building the user interface</li>
          <li>JavaScript – primary scripting language</li>
          <li>Google Chrome – primary browser for testing and development</li>
          <li>Google Dev Tools – for debugging and optimizing performance</li>
        </ul>
      </li>
      <li><strong>Back End:</strong>
        <ul>
          <li>Node.js – runtime environment for server-side code</li>
          <li>Express.js – for handling HTTP requests and routing</li>
        </ul>
      </li>
      <li><strong>Database:</strong>
        <ul>
          <li>PostgreSQL – relational database management system</li>
        </ul>
      </li>
      <li><strong>Hosting and Deployment:</strong>
        <ul>
          <li>Heroku – platform for deploying and managing the application online</li>
          <li>GitHub – for version control and collaboration</li>
        </ul>
      </li>
      <li><strong>Additional Libraries/Tools:</strong>
        <ul>
          <li>3rd-party APIs (planned) – for supplement and medication data, reminders, and medication images</li>
        </ul>
      </li>
    </ul>
  </div>
  );
}

export default AboutPage;
