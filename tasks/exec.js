module.exports = function (grunt) {
    'use strict';

    var config = {
        public_key: 'gpg --armor --export <%= config.gpg_short_id %> > <%= config.uploads %>/<%= config.gpg_short_id %>.asc',
        proof_of_identity: 'gpg -u <%= config.gpg_short_id %> --clearsign  <%= config.uploads %>/proof-of-identity.txt',
        obsolete_public_key: 'gpg --armor --export <%= config.obsolete_gpg_short_id %> > <%= config.uploads %>/<%= config.obsolete_gpg_short_id %>.asc',
        obsolete_proof: 'gpg -u <%= config.obsolete_gpg_short_id %> --clearsign <%= config.uploads %>/obsolete-<%= config.obsolete_gpg_short_id %>-proof.txt',
        work_public_key: 'gpg --armor --export <%= config.work_gpg_short_id %> > <%= config.uploads %>/<%= config.work_gpg_short_id %>.asc'
    };

    grunt.config.set('exec', config);
};
