import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import QuestionsList from '../components/QuestionsList';

const Home = () => {
  return (
    <Tabs>
      <TabList>
        <Tab>unanswered</Tab>
        <Tab>answered</Tab>
      </TabList>
      <TabPanel>
        <QuestionsList type="answered" />
      </TabPanel>
      <TabPanel>
        <QuestionsList />
      </TabPanel>
    </Tabs>
  );
};

export default Home;
