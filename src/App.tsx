import WinterWonderland from './assets/winter-wonderland.webp'
import TuxSnowboarding from './assets/tux-snowboarding.webp'

function App() {
  
  return (
    <>
    <div style={{backgroundImage: `url(${WinterWonderland})`}} className='bg-cover bg-center h-screen shadow-lg'>
      <div className='text-center py-5 bg-gold-200 bg-opacity-100 shadow-xl'>
        <h1 className='text-blue-500 font-bold font-sevillana text-5xl'>Tux's Winter Wonderland</h1>
      </div>
      <div>
      </div>
    </div>
    <div className='flex w-full justify-center mt-4'>
      <div className='w-1/2'>
        <h1 className='text-blue-500 text-4xl font-bold'>Tux's Hobbies</h1>
        <div className='mt-5 flex w-full justify-between items-center'>
          <img src={TuxSnowboarding} className='w-[500px] rounded' />
          <div className='ml-10'>
            <h2 className='text-gold-500 text-2xl'>Snowboarding</h2>
            <p>Tux absolutely loves snowboarding, gliding effortlessly down snowy slopes with a wide grin on his face. It's his favorite winter hobby, where he can enjoy the crisp air and the thrill of carving through fresh powder.</p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
};

export default App;