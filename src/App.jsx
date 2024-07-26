import './App.css';
import FOG from 'vanta/dist/vanta.fog.min';
import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
import { DndContext, closestCenter, MouseSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import PomodoroTimer from './components/pom';
import AskGemini from './components/askGemini';
import { Spotify } from 'spotify-embed-react';
import BlurIn from './components/blur';
import { AnimatedListDemo } from './components/testing';
import DailyGrowthChecklist from './components/growth';
// Function to fetch the quote of the day
const fetchQuoteOfTheDay = async () => {
  try {
    const response = await fetch('https://api.quotable.io/random?tags=life');
    const data = await response.json();
    return { quote: data.content, author: data.author };
  } catch (error) {
    console.error('Error fetching quote:', error);
    return { quote: 'No quote available', author: '' };
  }
};

// Function to fetch "Today I Learned" content

const fetchTodayILearned = async () => {
  try {
    const response = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
    const data = await response.json();
    return data.text; // Return the fact text
  } catch (error) {
    console.error('Error fetching today I learned:', error);
    return 'No learning content available';
  }
};


// Function to fetch steps data for the week
const fetchStepsData = async () => {
  // Placeholder steps data
  return {
    M: 5000,
    T: 7000,
    W: 6000,
    t: 8000,
    F: 9000,
    S: 10000,
    s: 11000
  };
};
const GoogleCalendar = () => {
  return (
    <iframe
      src="https://calendar.google.com/calendar/embed?height=580&wkst=1&ctz=UTC&bgcolor=%237CB342&showPrint=0&showTabs=0&showDate=0&showTz=0&showCalendars=0&showNav=0&showTitle=0&src=Z2FtYmxpbmd3aXRobXllbW90aW9uc0BnbWFpbC5jb20&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4uaW5kaWFuI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23039BE5&color=%2333B679&color=%230B8043"
      style={{ borderWidth: 0, borderRadius: 10 }}
      width="560"
      height="560"
    ></iframe>
  );
};
// GridItem Component
const GridItem = ({ id, className, customClass }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [quote, setQuote] = useState({ quote: '', author: '' });
  const [learned, setLearned] = useState('');
  const [stepsData, setStepsData] = useState({});

  useEffect(() => {
    const loadData = async () => {
      if (id === 2) {
        const quoteData = await fetchQuoteOfTheDay();
        const learnedData = await fetchTodayILearned();
        const stepsData = await fetchStepsData();
        setQuote(quoteData);
        setLearned(learnedData);
        setStepsData(stepsData);
      }
    };

    loadData();
  }, [id]);

  const renderMultiButtonCard = () => {
    const buttons = [
      { name: 'Google Meet', icon: 'https://www.brandeis.edu/its/_files/google-meet-logo.png', url: 'https://meet.google.com/' },
      { name: 'Google Keep', icon: 'https://www.gstatic.com/images/branding/product/1x/keep_48dp.png', url: 'https://keep.google.com/' },
      { name: 'Google Sheets', icon: 'https://www.gstatic.com/images/branding/product/1x/sheets_48dp.png', url: 'https://docs.google.com/spreadsheets/' },
      { name: 'Google Forms', icon: 'https://www.gstatic.com/images/branding/product/1x/forms_48dp.png', url: 'https://docs.google.com/forms/' },
    ];

    return (
      <div className="multi-button-card">
        {buttons.map((button, index) => (
          <a key={index} href={button.url} target="_blank" rel="noopener noreferrer" className="button-link">
            <img src={button.icon} alt={button.name} className="button-icon" />
            <span className="button-name">{button.name}</span>
          </a>
        ))}
      </div>
    );
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className={`card ${customClass}`}>
      {id === 1 ? (
        <AskGemini />
      ) : id === 6 ? (
        <PomodoroTimer />
      ) : id === 5 ? (
        renderMultiButtonCard()
      ) : id === 7 ? (
        <AnimatedListDemo />
      ) : id === 8 ? (
        <DailyGrowthChecklist />
      ): id === 10 ? (
        <GoogleCalendar />
      ): id === 11 ? (
        <Spotify url={"https://open.spotify.com/playlist/0vvXsWCC9xrXsKd4FyS8kM"} alternateTheme='true' height="560px" width="560px | wide | compact"  key={""} />
      ) : id === 9 ? (
        <iframe
          src="https://docs.google.com/spreadsheets/d/1uxRXOsmlh3DFStiwdEpImyfXFRjtxv4GhnScwoQqTB0/edit?gid=0#gid=0"
          width="100%"
          height="100%"
          allowFullScreen
          style={{ border: 'none' }}
        ></iframe>) : id === 2 ? (
        <div className="grid-item-content">
          <div className="quote-learn-container">
            <div className="quote-of-the-day">
              <blockquote>
                <p>"{quote.quote}"</p>
                <footer>— {quote.author}</footer>
              </blockquote>
            </div>
            <div className="today-i-learned">
              <h3>Today I Learned:</h3>
              <p>{learned}</p>
            </div>
          </div>
          <div className="health-steps-container">
            <div className="health-message">
              <p>Physical health is as important as mental health.</p>
            </div>
            <div className="steps-chart">
              {Object.keys(stepsData).map(day => (
                <div key={day} className="steps-bar" style={{ height: `${stepsData[day] / 100}px` }}>
                  <span className="steps-day">{day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
       ` Card ${id}`
      )}
    </div>
  );
};

// SlideCard Component
const SlideCard = ({ id, customClass }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className={customClass}>
      <iframe
        src="https://docs.google.com/presentation/d/1jnRWgTa8fVp-XBjcZ9pzOJ2nXkDX2icpD4Rt1Hpjb6E/edit#slide=id.gaf1f403e74_0_20"
        width="100%"
        height="100%"
        allowFullScreen
      ></iframe>
    </div>
  );
};

// App Component
function App() {
  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null);
  const [items1, setItems1] = useState([{ id: 'slide', className: 'cardi' }, { id: 1, className: 'cardi' }, { id: 2, className: 'card' }]);
  const [items2, setItems2] = useState([{ id: 5, className: 'card' }, { id: 6, className: 'card' }, { id: 7, className: 'cardii' }, { id: 8, className: 'card' }]);
  const [items3, setItems3] = useState([{ id: 9, className: 'card' }, { id: 10, className: 'cardi' }, { id: 11, className: 'cardi' }]);
  const greetings = [
    'Hello There :) Keep up the great work!',
    'Hi! :) Make today amazing!',
    'Hey there :) Conquer your goals today!',
    'Greetings :) Keep pushing forward!',
    'Hello :) Embrace the challenges ahead!',
    'Hi! :) Today is a new opportunity!',
    'Hey! :) Achieve something great today!',
    'Hello! :) Make the most of today!',
    'Hi :) Success is just around the corner!',
    'Greetings :) Keep striving for excellence!',
    'Hello :) Your efforts will shine today!',
    'Hi there :) Every day is a new chance!',
    'Hey :) Let’s make today productive!',
    'Hello :) Set your sights high today!',
    'Hi :) Keep making progress every day!',
    'Greetings :) Stay motivated and focused!',
    'Hello :) Today is full of possibilities!',
    'Hi there :) Keep moving forward with energy!',
    'Hey! :) Let your success speak for itself!',
    'Hello :) Your potential is limitless today!'
  ];
  const [randomGreeting, setRandomGreeting] = useState('');

  useEffect(() => {
    const getRandomGreeting = () => {
      const randomIndex = Math.floor(Math.random() * greetings.length);
      return greetings[randomIndex];
    };

    setRandomGreeting(getRandomGreeting());
  }, []);
  
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const sensors = useSensors(mouseSensor);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        FOG({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          highlightColor: 0xf,
          midtoneColor: 0x7fff00,
          lowlightColor: 0xf,
          baseColor: 0xf,
          blurFactor: 0.90,
          speed: 1.80,
          zoom: 0.60,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const grids = [items1, items2, items3];
      const setters = [setItems1, setItems2, setItems3];
      const activeGrid = grids.find(grid => grid.some(item => item.id === active.id));
      const setActiveGrid = setters[grids.indexOf(activeGrid)];
      const overGrid = grids.find(grid => grid.some(item => item.id === over.id));
      const setOverGrid = setters[grids.indexOf(overGrid)];

      if (activeGrid && overGrid && setActiveGrid && setOverGrid) {
        if (activeGrid === overGrid) {
          setActiveGrid((items) => {
            const oldIndex = items.findIndex(item => item.id === active.id);
            const newIndex = items.findIndex(item => item.id === over.id);
            return arrayMove(items, oldIndex, newIndex);
          });
        } else {
          const activeIndex = activeGrid.findIndex(item => item.id === active.id);
          const overIndex = overGrid.findIndex(item => item.id === over.id);
          const [movedItem] = activeGrid.splice(activeIndex, 1);
          overGrid.splice(overIndex, 0, movedItem);

          setActiveGrid([...activeGrid]);
          setOverGrid([...overGrid]);
        }
      }
    }
  };

  return (
    <div ref={vantaRef} className="bg">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items2.map(item => item.id)} strategy={horizontalListSortingStrategy}>
          <div className="grid-container1">
            {items2.map(({ id, className }) => (
              <GridItem key={id} id={id} customClass={className} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <BlurIn
        word={randomGreeting}
        className="py-14 text-9xl font-bold text-black dark:text-white"
      />
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items1.map(item => item.id)} strategy={horizontalListSortingStrategy}>
          <div className="grid-container">
            {items1.map(({ id, className }) => (
              id === 'slide' ? <SlideCard key={id} id={id} customClass={className} /> : <GridItem key={id} id={id} customClass={className} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items3.map(item => item.id)} strategy={horizontalListSortingStrategy}>
          <div className="grid-container">
            {items3.map(({ id, className }) => (
              <GridItem key={id} id={id} customClass={className} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}

export default App;
