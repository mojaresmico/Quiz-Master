require 'rails_helper'
RSpec.describe "Delete Questions" do
    
    before do
        @questions = Question.create(content: "What is the meaning of LAN?", answer: "Local Area Network")
    end 
    it "deleting questions", js: true  do
        visit "/"
        click_link "Destroy"
        click_button "Ok"
    end 
end