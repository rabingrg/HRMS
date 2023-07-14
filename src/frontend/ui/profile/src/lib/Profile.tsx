import ProfileCard from './ProfileCard';

/* eslint-disable-next-line */

export function Profile() {
  return (
    <>
      <div className="bg-[url('E:/work/HRMS3/hrms3/public/circuit-board.svg')] bg-primary-7 from-primary-6  h-56 items-center rounded-r-x "></div>
      <section className="p-4 -mt-24 md:flex md:items-start md:space-x-6 ">
        <ProfileCard />
       
      </section>
    </>
  );
}

export default Profile;
