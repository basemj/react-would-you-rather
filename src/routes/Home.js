import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import QuestionsList from '../components/QuestionsList';
import 'react-tabs/style/react-tabs.css';

const Home = () => {
  return (
    <Tabs>
      <TabList>
        <Tab>Unanswered</Tab>
        <Tab>Answered</Tab>
      </TabList>
      <TabPanel>
        <QuestionsList />
      </TabPanel>
      <TabPanel>
        <QuestionsList type="answered" />
      </TabPanel>
    </Tabs>
  );
};

export default Home;
