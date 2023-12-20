import { teamInfo } from "@/app/Misc/TeamInfo";
import Image from "next/image";
import './team.css'
export default function Team() {
  return (
    <main className='mb-[100px] mt-[-100px]'>
      <div className={`bg-[url('https://capitasnowboarding.com/cdn/shop/files/000_GRID_PAPER_BG_1_77e3e65d-56ba-4a1f-a70b-76408f3b3cbf.png?v=1690637051')]`}>
        <div className='content-container pt-[150px] pb-[40px] px-[20px] md:px-[70px]'>
          <section className='text-primary'>
            <div className='team-container'>
              {teamInfo.map((team, i) => {
                return (
                  <div key={i} className='team-member-container border-[1.5px] rounded-lg flex flex-col items-center'>
                    <div className='w-full border-b-[1.5px]'>
                      <Image
                        src={team.image}
                        height={200}
                        width={200}
                        alt={`Picture of team member: ${team.name}`}
                        objectFit="cover"
                        className='w-full h-[200px] lg:h-[250px]'
                        />
                    </div>
                    <span className='py-4 font-bold text-lg'>{team.name}</span>
                  </div>
                )
              })}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}