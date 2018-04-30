FactoryBot.define do
    factory :division do 
         name { Faker::Company.name }
         director{ Faker::Name.name }
         divisionLink { Faker::Internet.url }
    end
end