require 'rails_helper'

RSpec.describe "EDIT QUESTIONS" do
    before do
    @question = Question.destroy_all
    @question = Question.create(content: "What is your name?", answer: "Mico")
        
    end 
    scenario "Editing Questions" do
        visit_root_path
        click_edit_link
        link_and_field_validation
        update_fields
        click_update_button
    end 

    def visit_root_path
        visit root_path
    end 
    def  click_edit_link
         click_link "Edit"
    end 
    def link_and_field_validation
        expect(current_path).to eq("/questions/#{@question.id}/edit")
        expect(find_field('question_content').value).to eq(@question.content)
        expect(find_field('question_answer').value).to eq(@question.answer)
        expect(page).to have_text("Editing Question")
    end
    def update_fields
        fill_in 'question_answer', with: "What is the capital city of Philippines"
        fill_in 'question_content', with: "Manila"
    end 
    def click_update_button
        click_button "Update Question"
    end 
end