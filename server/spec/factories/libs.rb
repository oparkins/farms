FactoryBot.define do
    factory :lib do 
         name { Faker::Lorem.word }
         verify { Faker::Name.name }
         link { Faker::Internet.url }
    end
end