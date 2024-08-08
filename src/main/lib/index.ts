import { appDirName, fileEnconding } from '@shared/constants'
import { NoteInfo } from '@shared/models'
import { GetNotes } from '@shared/types'
import { ensureDir, readdir, stat } from 'fs-extra'
import { homedir } from 'os'

export const getRouteDir = () => {
  return `${homedir()}/${appDirName}`
}

export const getNotes: GetNotes = async () => {
  const rootDir = getRouteDir()

  await ensureDir(rootDir)

  const notesFileNames = await readdir(rootDir, {
    encoding: fileEnconding,
    withFileTypes: false
  })

  // Verifica todos os arquivos dentro do diretório passado como parâmetro

  const notes = notesFileNames.filter((fileName) => fileName.endsWith('.md'))

  // Filtra todos os arquivos que terminam com .md

  return Promise.all(notes.map(GetNoteInfoFromFileName))
}

export const GetNoteInfoFromFileName = async (fileName: string): Promise<NoteInfo> => {
  const fileStats = await stat(`${getRouteDir()}/${fileName}`)
  return {
    title: fileName.replace(/\.md$/, ''),
    lastEditTime: fileStats.mtimeMs
  }
}
