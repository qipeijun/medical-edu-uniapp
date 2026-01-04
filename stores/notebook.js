/**
 * 笔记本状态管理
 */

import { defineStore } from 'pinia'
import { setStorage, getStorage } from '@/utils/storage'

const STORAGE_KEY_NOTES = 'user_notes'

export const useNotebookStore = defineStore('notebook', {
	state: () => ({
		notes: [] // { id, title, content, date, tags }
	}),

	actions: {
		loadNotes() {
			this.notes = getStorage(STORAGE_KEY_NOTES, [])
		},

		addNote(note) {
			const newNote = {
				id: 'n_' + Date.now(),
				date: new Date().toISOString(),
				...note
			}
			this.notes.unshift(newNote)
			this.saveNotes()
            return newNote
		},

		updateNote(id, content) {
			const index = this.notes.findIndex(n => n.id === id)
			if (index !== -1) {
				this.notes[index] = { ...this.notes[index], ...content, date: new Date().toISOString() }
				this.saveNotes()
			}
		},

		deleteNote(id) {
			this.notes = this.notes.filter(n => n.id !== id)
			this.saveNotes()
		},
        
        getNoteById(id) {
            return this.notes.find(n => n.id === id)
        },

		saveNotes() {
			setStorage(STORAGE_KEY_NOTES, this.notes)
		}
	}
})
