const userSchema = require('./schemas/user');
const storeSchema = require('./schemas/store');

const createAdminUser = async()=>{
    try{
        const checkAdmin = await userSchema.findOne({userName : 'admin12345'});
        if(checkAdmin) return;  
  
        let obj = {
            gender: 'Male', firstName : 'admin', lastName : '', userName : 'admin12345',
             email : 'admin@gmail.com', role : 'admin', password: '12345'
          }
          await userSchema.create(obj);
          console.log('Admin created!');
    }
    catch(err){

    }
}

const createStoresAndUsers = async()=>{
    try{

      const checkRootStore = await storeSchema.findOne({name: 'srbija'});
      if(checkRootStore) return;  
      // level 0
      const obj = { name: 'srbija'};
      const rootStore = await storeSchema.create(obj);

      //Users level 0
      const user1 = {
        gender: 'Male', firstName : 'User', lastName : '1', userName : 'user1',
         email : 'user1@gmail.com', role : 'employee', password: '12345',
         storeId: rootStore._id
      }
      await userSchema.create(user1);
      console.log('User 1 created!');

      const user2 = {
        gender: 'Male', firstName : 'User', lastName : '2', userName : 'user2',
         email : 'user2@gmail.com', role : 'manager', password: '12345',
         storeId: rootStore._id
      }
      await userSchema.create(user2);
      console.log('User 2 created!');

      // level 1
      const obj1 = { name: 'Vojvodina', parent: rootStore._id};
      const level1Store1 = await storeSchema.create(obj1);

      const obj2 = { name: 'Grad Beogard', parent: rootStore._id};
      const level1Store2 = await storeSchema.create(obj2);


      //Users level 1
      const user3 = {
        gender: 'Male', firstName : 'User', lastName : '3', userName : 'user3',
         email : 'user3@gmail.com', role : 'employee', password: '12345',
         storeId: level1Store1._id
      }
      await userSchema.create(user3);
      console.log('User 3 created!');

      const user4 = {
        gender: 'Male', firstName : 'User', lastName : '4', userName : 'user4',
         email : 'user4@gmail.com', role : 'manager', password: '12345',
         storeId: level1Store1._id
      }
      await userSchema.create(user4);
      console.log('User 4 created!');

      const user5 = {
        gender: 'Male', firstName : 'User', lastName : '5', userName : 'user5',
         email : 'user5@gmail.com', role : 'employee', password: '12345',
         storeId: level1Store2._id
      }
      await userSchema.create(user5);
      console.log('User 5 created!');

      const user6 = {
        gender: 'Male', firstName : 'User', lastName : '6', userName : 'user6',
         email : 'user6@gmail.com', role : 'manager', password: '12345',
         storeId: level1Store2._id
      }
      await userSchema.create(user6);
      console.log('User 6 created!');


      // level 2
      const obj3 = { name: 'Severnobacki okrug', parent: level1Store1._id};
      const level2Store1 = await storeSchema.create(obj3);

      const obj4 = { name: 'Juznobacki okrug', parent: level1Store1._id};
      const level2Store2 = await storeSchema.create(obj4);

      const obj5 = { name: 'Novi Beogard', parent: level1Store2._id};
      const level2Store3 = await storeSchema.create(obj5);

      const obj6 = { name: 'Vracar', parent: level1Store2._id};
      const level2Store4 = await storeSchema.create(obj6);

      // Users Level 2
      
      const user7 = {
        gender: 'Male', firstName : 'User', lastName : '7', userName : 'user7',
         email : 'user7@gmail.com', role : 'employee', password: '12345',
         storeId: level2Store1._id
      }
      await userSchema.create(user7);
      console.log('User 7 created!');

      const user8 = {
        gender: 'Male', firstName : 'User', lastName : '8', userName : 'user8',
         email : 'user8@gmail.com', role : 'manager', password: '12345',
         storeId: level2Store1._id
      }
      await userSchema.create(user8);
      console.log('User 8 created!');

      const user9 = {
        gender: 'Male', firstName : 'User', lastName : '9', userName : 'user9',
         email : 'user9@gmail.com', role : 'employee', password: '12345',
         storeId: level2Store2._id
      }
      await userSchema.create(user9);
      console.log('User 9 created!');

      const user10 = {
        gender: 'Male', firstName : 'User', lastName : '10', userName : 'user10',
         email : 'user10@gmail.com', role : 'manager', password: '12345',
         storeId: level2Store2._id
      }
      await userSchema.create(user10);
      console.log('User 10 created!');


      const user11 = {
        gender: 'Male', firstName : 'User', lastName : '11', userName : 'user11',
         email : 'user11@gmail.com', role : 'employee', password: '12345',
         storeId: level2Store3._id
      }
      await userSchema.create(user11);
      console.log('User 11 created!');

      const user12 = {
        gender: 'Male', firstName : 'User', lastName : '12', userName : 'user12',
         email : 'user12@gmail.com', role : 'manager', password: '12345',
         storeId: level2Store3._id
      }
      await userSchema.create(user12);
      console.log('User 12 created!');


      const user13 = {
        gender: 'Male', firstName : 'User', lastName : '13', userName : 'user13',
         email : 'user13@gmail.com', role : 'employee', password: '12345',
         storeId: level2Store4._id
      }
      await userSchema.create(user13);
      console.log('User 13 created!');

      const user14 = {
        gender: 'Male', firstName : 'User', lastName : '14', userName : 'user14',
         email : 'user14@gmail.com', role : 'manager', password: '12345',
         storeId: level2Store4._id
      }
      await userSchema.create(user14);
      console.log('User 14 created!');


      // level 3
      const obj7 = { name: 'Subotica', parent: level2Store1._id};
      const level3Store1 = await storeSchema.create(obj7);

      const obj8 = { name: 'Novi Sad', parent: level2Store2._id};
      const level3Store2 = await storeSchema.create(obj8);

      const obj9 = { name: 'Bejaniza', parent: level2Store3._id};
      const level3Store3 = await storeSchema.create(obj9);

      const obj10 = { name: 'Neimar', parent: level2Store4._id};
      const level3Store4 = await storeSchema.create(obj10);

      const obj11 = { name: 'Crveni Krst', parent: level2Store4._id};
      const level3Store5 = await storeSchema.create(obj11);

      // Users Level 3

      const user15 = {
        gender: 'Male', firstName : 'User', lastName : '15', userName : 'user15',
         email : 'user15@gmail.com', role : 'employee', password: '12345',
         storeId: level3Store1._id
      }
      await userSchema.create(user15);
      console.log('User 15 created!');

      const user16 = {
        gender: 'Male', firstName : 'User', lastName : '16', userName : 'user16',
         email : 'user16@gmail.com', role : 'manager', password: '12345',
         storeId: level3Store1._id
      }
      await userSchema.create(user16);
      console.log('User 16 created!');


      const user17 = {
        gender: 'Male', firstName : 'User', lastName : '17', userName : 'user17',
         email : 'user17@gmail.com', role : 'employee', password: '12345',
         storeId: level3Store2._id
      }
      await userSchema.create(user17);
      console.log('User 17 created!');

      const user18 = {
        gender: 'Male', firstName : 'User', lastName : '18', userName : 'user18',
         email : 'user18@gmail.com', role : 'manager', password: '12345',
         storeId: level3Store2._id
      }
      await userSchema.create(user18);
      console.log('User 18 created!');


      const user19 = {
        gender: 'Male', firstName : 'User', lastName : '19', userName : 'user19',
         email : 'user19@gmail.com', role : 'employee', password: '12345',
         storeId: level3Store3._id
      }
      await userSchema.create(user19);
      console.log('User 19 created!');

      const user20 = {
        gender: 'Male', firstName : 'User', lastName : '20', userName : 'user20',
         email : 'user20@gmail.com', role : 'manager', password: '12345',
         storeId: level3Store3._id
      }
      await userSchema.create(user20);
      console.log('User 20 created!');


      const user21 = {
        gender: 'Male', firstName : 'User', lastName : '21', userName : 'user21',
         email : 'user21@gmail.com', role : 'employee', password: '12345',
         storeId: level3Store4._id
      }
      await userSchema.create(user21);
      console.log('User 21 created!');

      const user22 = {
        gender: 'Male', firstName : 'User', lastName : '22', userName : 'user22',
         email : 'user22@gmail.com', role : 'manager', password: '12345',
         storeId: level3Store4._id
      }
      await userSchema.create(user22);
      console.log('User 22 created!');


      const user23 = {
        gender: 'Male', firstName : 'User', lastName : '23', userName : 'user23',
         email : 'user23@gmail.com', role : 'employee', password: '12345',
         storeId: level3Store5._id
      }
      await userSchema.create(user23);
      console.log('User 23 created!');

      const user24 = {
        gender: 'Male', firstName : 'User', lastName : '24', userName : 'user24',
         email : 'user24@gmail.com', role : 'manager', password: '12345',
         storeId: level3Store5._id
      }
      await userSchema.create(user24);
      console.log('User 24 created!');


      // level 4
      const obj12 = { name: 'Radnja 1', parent: level3Store1._id};
      const level4Store1 = await storeSchema.create(obj12);

      const obj13 = { name: 'Detelinara', parent: level3Store2._id};
      const level4Store2 = await storeSchema.create(obj13);

      const obj14 = { name: 'Limen', parent: level3Store2._id};
      const level4Store3 = await storeSchema.create(obj14);

      const obj15 = { name: 'Radjna 6', parent: level3Store3._id};
      const level4Store4 = await storeSchema.create(obj15);

      const obj16 = { name: 'Radjna 7', parent: level3Store4._id};
      const level4Store5 = await storeSchema.create(obj16);

      const obj17 = { name: 'Radjna 8', parent: level3Store5._id};
      const level4Store6 = await storeSchema.create(obj17);

      const obj18 = { name: 'Radjna 9', parent: level3Store5._id};
      const level4Store7 = await storeSchema.create(obj18);

      // Users Level 4

      const user25 = {
        gender: 'Male', firstName : 'User', lastName : '25', userName : 'user25',
         email : 'user25@gmail.com', role : 'employee', password: '12345',
         storeId: level4Store1._id
      }
      await userSchema.create(user25);
      console.log('User 25 created!');

      const user26 = {
        gender: 'Male', firstName : 'User', lastName : '26', userName : 'user26',
         email : 'user26@gmail.com', role : 'manager', password: '12345',
         storeId: level4Store1._id
      }
      await userSchema.create(user26);
      console.log('User 26 created!');


      const user27 = {
        gender: 'Male', firstName : 'User', lastName : '27', userName : 'user27',
         email : 'user27@gmail.com', role : 'employee', password: '12345',
         storeId: level4Store2._id
      }
      await userSchema.create(user27);
      console.log('User 27 created!');

      const user28 = {
        gender: 'Male', firstName : 'User', lastName : '28', userName : 'user28',
         email : 'user28@gmail.com', role : 'manager', password: '12345',
         storeId: level4Store2._id
      }
      await userSchema.create(user28);
      console.log('User 28 created!');


      const user29 = {
        gender: 'Male', firstName : 'User', lastName : '29', userName : 'user29',
         email : 'user29@gmail.com', role : 'employee', password: '12345',
         storeId: level4Store3._id
      }
      await userSchema.create(user29);
      console.log('User 29 created!');

      const user30 = {
        gender: 'Male', firstName : 'User', lastName : '30', userName : 'user30',
         email : 'user30@gmail.com', role : 'manager', password: '12345',
         storeId: level4Store3._id
      }
      await userSchema.create(user30);
      console.log('User 30 created!');


      const user31 = {
        gender: 'Male', firstName : 'User', lastName : '31', userName : 'user31',
         email : 'user31@gmail.com', role : 'employee', password: '12345',
         storeId: level4Store4._id
      }
      await userSchema.create(user31);
      console.log('User 31 created!');

      const user32 = {
        gender: 'Male', firstName : 'User', lastName : '32', userName : 'user32',
         email : 'user32@gmail.com', role : 'manager', password: '12345',
         storeId: level4Store4._id
      }
      await userSchema.create(user32);
      console.log('User 32 created!');


      const user33 = {
        gender: 'Male', firstName : 'User', lastName : '33', userName : 'user33',
         email : 'user33@gmail.com', role : 'employee', password: '12345',
         storeId: level4Store5._id
      }
      await userSchema.create(user33);
      console.log('User 33 created!');

      const user34 = {
        gender: 'Male', firstName : 'User', lastName : '34', userName : 'user34',
         email : 'user34@gmail.com', role : 'manager', password: '12345',
         storeId: level4Store5._id
      }
      await userSchema.create(user34);
      console.log('User 34 created!');


      const user35 = {
        gender: 'Male', firstName : 'User', lastName : '35', userName : 'user35',
         email : 'user35@gmail.com', role : 'employee', password: '12345',
         storeId: level4Store6._id
      }
      await userSchema.create(user35);
      console.log('User 35 created!');

      const user36 = {
        gender: 'Male', firstName : 'User', lastName : '36', userName : 'user36',
         email : 'user36@gmail.com', role : 'manager', password: '12345',
         storeId: level4Store6._id
      }
      await userSchema.create(user36);
      console.log('User 36 created!');


      const user37 = {
        gender: 'Male', firstName : 'User', lastName : '37', userName : 'user37',
         email : 'user37@gmail.com', role : 'employee', password: '12345',
         storeId: level4Store7._id
      }
      await userSchema.create(user37);
      console.log('User 37 created!');

      const user38 = {
        gender: 'Male', firstName : 'User', lastName : '38', userName : 'user38',
         email : 'user38@gmail.com', role : 'manager', password: '12345',
         storeId: level4Store7._id
      }
      await userSchema.create(user38);
      console.log('User 38 created!');




      // level 5
      const obj19 = { name: 'Radnja 2', parent: level4Store2._id};
      const level5Store1 = await storeSchema.create(obj19);

      const obj20 = { name: 'Radnja 3', parent: level4Store2._id};
      const level5Store2 = await storeSchema.create(obj20);

      const obj21 = { name: 'Radnja 4', parent: level4Store3._id};
      const level5Store3 = await storeSchema.create(obj21);

      const obj22 = { name: 'Radjna 5', parent: level4Store3._id};
      const level5Store4 = await storeSchema.create(obj22);


      // Users Level 5

      const user39 = {
        gender: 'Male', firstName : 'User', lastName : '39', userName : 'user39',
         email : 'user39@gmail.com', role : 'employee', password: '12345',
         storeId: level5Store1._id
      }
      await userSchema.create(user39);
      console.log('User 39 created!');

      const user40 = {
        gender: 'Male', firstName : 'User', lastName : '40', userName : 'user40',
         email : 'user40@gmail.com', role : 'manager', password: '12345',
         storeId: level5Store1._id
      }
      await userSchema.create(user40);
      console.log('User 40 created!');


      const user41 = {
        gender: 'Male', firstName : 'User', lastName : '41', userName : 'user41',
         email : 'user41@gmail.com', role : 'employee', password: '12345',
         storeId: level5Store2._id
      }
      await userSchema.create(user41);
      console.log('User 41 created!');

      const user42 = {
        gender: 'Male', firstName : 'User', lastName : '42', userName : 'user42',
         email : 'user42@gmail.com', role : 'manager', password: '12345',
         storeId: level5Store2._id
      }
      await userSchema.create(user42);
      console.log('User 42 created!');


      const user43 = {
        gender: 'Male', firstName : 'User', lastName : '43', userName : 'user43',
         email : 'user43@gmail.com', role : 'employee', password: '12345',
         storeId: level5Store3._id
      }
      await userSchema.create(user43);
      console.log('User 43 created!');

      const user44 = {
        gender: 'Male', firstName : 'User', lastName : '44', userName : 'user44',
         email : 'user44@gmail.com', role : 'manager', password: '12345',
         storeId: level5Store3._id
      }
      await userSchema.create(user44);
      console.log('User 44 created!');


      const user45 = {
        gender: 'Male', firstName : 'User', lastName : '45', userName : 'user45',
         email : 'user45@gmail.com', role : 'employee', password: '12345',
         storeId: level5Store4._id
      }
      await userSchema.create(user45);
      console.log('User 45 created!');

      const user46 = {
        gender: 'Male', firstName : 'User', lastName : '46', userName : 'user46',
         email : 'user46@gmail.com', role : 'manager', password: '12345',
         storeId: level5Store4._id
      }
      await userSchema.create(user46);
      console.log('User 46 created!');

    }
    catch(err){
        console.log(err);
    }
}

module.exports = {createStoresAndUsers, createAdminUser};
