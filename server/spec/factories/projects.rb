FactoryBot.define do
    factory :project do 
         name { Faker::Lorem.word }
         projectLead { Faker::Lorem.word }
         email { Faker::Internet.email }
    end
end
