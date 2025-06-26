#!/usr/bin/env node
/**
 * Backup and Migration Script
 * 
 * This script provides a safe way to backup existing blog files and run the unified migration.
 * It includes safety checks and rollback capabilities.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const BLOG_DIR = path.resolve(__dirname, '../src/blog');
const BACKUP_DIR = path.resolve(__dirname, '../src/blog.backups');
const MIGRATION_SCRIPT = path.resolve(__dirname, 'unified_migration.js');

function log(message, level = 'info') {
  const timestamp = new Date().toISOString();
  const prefix = level === 'error' ? '❌' : level === 'warn' ? '⚠️' : 'ℹ️';
  console.log(`${prefix} [${timestamp}] ${message}`);
}

function createBackup() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupName = `blog-backup-${timestamp}`;
  const backupPath = path.join(BACKUP_DIR, backupName);
  
  log(`Creating backup: ${backupName}`);
  
  // Ensure backup directory exists
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }
  
  // Copy files
  execSync(`cp -r "${BLOG_DIR}" "${backupPath}"`);
  
  log(`✅ Backup created: ${backupPath}`);
  return backupPath;
}

function listBackups() {
  if (!fs.existsSync(BACKUP_DIR)) {
    log('No backups found.');
    return [];
  }
  
  const backups = fs.readdirSync(BACKUP_DIR)
    .filter(name => name.startsWith('blog-backup-'))
    .sort()
    .reverse();
  
  log(`Found ${backups.length} backups:`);
  backups.forEach((backup, index) => {
    const backupPath = path.join(BACKUP_DIR, backup);
    const stats = fs.statSync(backupPath);
    const fileCount = fs.readdirSync(backupPath).length;
    console.log(`  ${index + 1}. ${backup} (${fileCount} files, ${stats.mtime.toISOString()})`);
  });
  
  return backups;
}

function restoreBackup(backupName) {
  const backupPath = path.join(BACKUP_DIR, backupName);
  
  if (!fs.existsSync(backupPath)) {
    log(`Backup not found: ${backupName}`, 'error');
    return false;
  }
  
  log(`Restoring backup: ${backupName}`);
  
  // Remove current blog directory
  if (fs.existsSync(BLOG_DIR)) {
    execSync(`rm -rf "${BLOG_DIR}"`);
  }
  
  // Copy backup back
  execSync(`cp -r "${backupPath}" "${BLOG_DIR}"`);
  
  log(`✅ Restored backup: ${backupName}`);
  return true;
}

function runMigration(options = {}) {
  const { dryRun = false, verbose = false, entry = null } = options;
  
  let command = `node "${MIGRATION_SCRIPT}"`;
  if (dryRun) command += ' --dry-run';
  if (verbose) command += ' --verbose';
  if (entry) command += ` --entry ${entry}`;
  
  log(`Running migration: ${command}`);
  
  try {
    const output = execSync(command, { 
      cwd: path.dirname(MIGRATION_SCRIPT),
      encoding: 'utf8'
    });
    console.log(output);
    log('✅ Migration completed successfully');
    return true;
  } catch (error) {
    log(`Migration failed: ${error.message}`, 'error');
    return false;
  }
}

function getFileStats(directory) {
  if (!fs.existsSync(directory)) {
    return { fileCount: 0, totalSize: 0 };
  }
  
  const files = fs.readdirSync(directory);
  let totalSize = 0;
  
  files.forEach(file => {
    const filePath = path.join(directory, file);
    const stats = fs.statSync(filePath);
    if (stats.isFile()) {
      totalSize += stats.size;
    }
  });
  
  return { fileCount: files.length, totalSize };
}

function showStats() {
  const stats = getFileStats(BLOG_DIR);
  const backupStats = fs.existsSync(BACKUP_DIR) ? getFileStats(BACKUP_DIR) : { fileCount: 0, totalSize: 0 };
  
  log(`Current blog directory: ${stats.fileCount} files, ${(stats.totalSize / 1024).toFixed(1)} KB`);
  log(`Backup directory: ${backupStats.fileCount} files, ${(backupStats.totalSize / 1024).toFixed(1)} KB`);
}

function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  switch (command) {
    case 'backup':
      createBackup();
      break;
      
    case 'list':
      listBackups();
      break;
      
    case 'restore':
      if (!args[1]) {
        log('Usage: backup_and_migrate.js restore <backup-name>', 'error');
        log('Use "list" command to see available backups', 'error');
        process.exit(1);
      }
      restoreBackup(args[1]);
      break;
      
    case 'migrate':
      const options = {};
      for (let i = 1; i < args.length; i++) {
        if (args[i] === '--dry-run') options.dryRun = true;
        if (args[i] === '--verbose') options.verbose = true;
        if (args[i] === '--entry' && i + 1 < args.length) {
          options.entry = args[i + 1];
          i++;
        }
      }
      runMigration(options);
      break;
      
    case 'safe-migrate':
      log('🔒 Starting safe migration process...');
      
      // Check if migration script exists
      if (!fs.existsSync(MIGRATION_SCRIPT)) {
        log(`Migration script not found: ${MIGRATION_SCRIPT}`, 'error');
        process.exit(1);
      }
      
      // Create backup
      const backupPath = createBackup();
      
      // Run migration
      const success = runMigration({ verbose: true });
      
      if (success) {
        log('🎉 Safe migration completed successfully!');
        log(`Backup available at: ${backupPath}`);
      } else {
        log('❌ Migration failed. Your original files are safe.', 'error');
        log(`Backup available at: ${backupPath}`, 'error');
      }
      break;
      
    case 'test':
      const testEntry = args[1] || '1504';
      log(`🧪 Testing migration on entry ${testEntry}...`);
      runMigration({ entry: testEntry, verbose: true, dryRun: true });
      break;
      
    case 'stats':
      showStats();
      break;
      
    default:
      console.log(`
Blog Migration Backup & Safety Script

Usage: node backup_and_migrate.js <command> [options]

Commands:
  backup                Create a backup of current blog files
  list                  List available backups
  restore <name>        Restore a specific backup
  migrate [options]     Run migration with optional flags
  safe-migrate          Create backup, then run migration
  test [entry]          Test migration on specific entry (default: 1504)
  stats                 Show file statistics

Migration Options:
  --dry-run            Show what would be done without making changes
  --verbose            Show detailed output
  --entry <num>        Process only specific entry

Examples:
  node backup_and_migrate.js backup
  node backup_and_migrate.js safe-migrate
  node backup_and_migrate.js test 1504
  node backup_and_migrate.js migrate --dry-run --verbose
  node backup_and_migrate.js restore blog-backup-2024-01-01T12-00-00-000Z
      `);
      break;
  }
}

if (require.main === module) {
  main();
}

module.exports = { createBackup, listBackups, restoreBackup, runMigration, showStats };
