FactoryBot.define do
    factory :file_datum do 
         name { Faker::Lorem.word }
         data { Faker::Hacker.say_something_smart }
         dataHash { Faker::Internet.email }
    end
end
