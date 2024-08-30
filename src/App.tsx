import WinterWonderland from './assets/winter-wonderland.webp'
import TuxSnowboarding from './assets/tux-snowboarding.webp'
import TuxCampfire from './assets/tux-campfire.webp'
import TuxSnowman from './assets/tux-snowman.webp'
import TuxHeadshot from './assets/tux-headshot.webp'

function App() {
  return (
    <>
      <div style={{backgroundImage: `url(${WinterWonderland})`}} className='bg-cover bg-center h-screen shadow-lg'>
        <div className='h-1/6' />
        <div className='w-full flex justify-center bg-white bg-opacity-50 py-5'>
          <img src={TuxHeadshot} className='w-[400px] h-[400px] rounded-full' />
          <div className='flex flex-col justify-center w-[500px] ml-10'>
            <h2 className='font-bold text-gold-500 text-xl'>Meet Tux</h2>
            <p>Meet Tux, the cheerful Linux penguin who loves exploring his snowy winter wonderland. Join him in his favorite winter activities, from building snowmen to cozying up by the campfire.</p>
          </div>
        </div>

        <div className='w-full text-center mt-28 py-5 bg-blue-700 bg-opacity-50'>
          <p className='font-bold text-white text-3xl'>Scroll down to learn about Tux's Hobbies!</p>
        </div>
      </div>

      <div className='flex w-full justify-center'>
        <div className='w-2/3'>
          <h1 className='text-blue-500 text-4xl font-bold text-center mt-7'>Tux's Hobbies</h1>
          <div className='mt-7 flex w-full justify-between items-center'>
            <img src={TuxSnowboarding} className='w-[450px] rounded' />
            <div className='ml-10'>
              <h2 className='text-gold-500 text-2xl'>Snowboarding</h2>
              <p>Tux absolutely loves snowboarding, gliding effortlessly down snowy slopes with a wide grin on his face. It's his favorite winter hobby, where he can enjoy the crisp air and the thrill of carving through fresh powder.</p>
            </div>
          </div>

          <div className='mt-10 flex w-full justify-between items-center'>
            <div className='mr-10'>
              <h2 className='text-gold-500 text-2xl'>Sitting around the fire</h2>
              <p>Tux absolutely loves campfires, especially in the serene winter landscape of his wonderland. There's nothing he enjoys more than sitting by a warm fire, sipping hot chocolate, and gazing up at the starry night sky while surrounded by snow-covered trees.</p>
            </div>
            <img src={TuxCampfire} className='w-[450px] rounded' />
          </div>

          <div className='mt-10 flex w-full justify-between items-center mb-10'>
            <img src={TuxSnowman} className='w-[450px] rounded' />
            <div className='ml-10'>
              <h2 className='text-gold-500 text-2xl'>Building a Snowman</h2>
              <p>Tux loves the peaceful joy of building a snowman in his winter wonderland. With careful precision, he places the snowman's head, adding the final touches to a creation that stands proudly against the backdrop of snow-covered trees and a cozy log cabin. The crisp winter air and serene landscape make this moment one of Tux's favorite winter activities.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default App;