FactoryBot.define do
    factory :version do 
         gitLink { Faker::Internet.url }
         docLink { Faker::Internet.url }
         ciLink { Faker::Internet.url }
         buildDate { Faker::Date.between(10.days.ago, Date.today) }
    end
end
