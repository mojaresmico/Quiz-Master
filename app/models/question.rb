class Question < ActiveRecord::Base
    validates  :content, :answer, presence: true 
end
