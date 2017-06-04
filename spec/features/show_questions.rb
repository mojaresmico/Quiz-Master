require 'rails_helper'

RSpec.describe "show questions" do
    before do
        @question = Question.destroy_all
        @question = Question.create(content: "What is the meaning of LTE?", answer: "Long Term Evolution")
    end 
    it "show profile id" do
        visit "add-questions"
        click_link "Show", match: :first
        expect(current_path).to eq("/questions/#{@question.id}")
        expect(page).to have_text("#{@question.content}")
        expect(page).to have_text("#{@question.answer}")
    end 
end