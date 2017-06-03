require "rails_helper"

RSpec.describe "create new question" do
    before do
     visit new_question_path
    end
    it "create new question" do
        fill_in 'question_content', with: "How many days are in a year?"
        fill_in 'question_answer', with: "365"
        click_button "Create Question"
    end
    it "no data on textfield" do
        click_button "Create Question"
    end  
end