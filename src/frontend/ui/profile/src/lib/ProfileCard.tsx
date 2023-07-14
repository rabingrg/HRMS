import React from 'react';

const ProfileCard = () => {
  return (
    <section className="bg-[#fff] shadow-md rounded-md p-4 max-w-[250px] space-y-4">
      <div className="size-36 rounded-full mx-auto overflow-hidden bg-[url('https://npg.si.edu/sites/default/files/blog_obama_martin_schoeller.jpg')] bg-cover"></div>

      <h6 className="text-center text-xl text-gray-900 font-medium leading-5">
        obhmak babhama
        <br /> <span className="text-sm text-gray-11">Web Developer</span>
      </h6>

      <div className="grid grid-cols-2 gap-y-4">
        <span className="font-medium">Address</span>
        <span className="text-gray-11">Jomson-3, Mustang Nepal</span>
        <span className="font-medium">Phone</span>
        <span className="text-gray-11">+977 9955221114</span>
        <span className="font-medium">Email</span>
        <span className="break-words text-gray-11">
          NotThePresident@Usa.com
        </span>
      </div>
    </section>
  );
};

export default ProfileCard;
