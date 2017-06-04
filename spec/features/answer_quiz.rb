require "rails_helper"

RSpec.describe "TAKE QUIZ" do
    before do
     visit "/take-quiz"
    end
    it "answer quiz" do
        @question = Question.all
        @question.each do |question|
            text_id = "A"+question.id.to_s
            fill_in text_id, with: "9"
        end 
       find('input[name="submit"]').click
       expect(current_path).to eq("/submit-quiz")
       expect(page).to have_text("Thank you for answering Questions")
       expect(page).to have_text("4")
    end
    
end