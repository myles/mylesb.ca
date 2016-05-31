module.exports = function (grunt) {
    'use strict';

    var config = {
        public_key: 'gpg --armor --export <%= config.gpg_short_id %> > <%= config.uploads %>/<%= config.gpg_short_id %>.asc',
        proof_of_identity: 'gpg -u <%= config.gpg_short_id %> --clearsign  <%= config.uploads %>/proof-of-identity.txt',

        xmpp_otr_fingerprints: 'gpg -u <%=config.gpg_short_id %> --clearsign <%= config.uploads %>/xmpp-otr-fingerprints.txt',

        ssh_keys: 'gpg -u <%=config.gpg_short_id %> --clearsign <%= config.uploads %>/myles-braithwaite*.pub',
        ssh_key_fingerprints: 'gpg -u <%=config.gpg_short_id %> --clearsign <%= config.uploads %>/ssh-key-fingerprints.txt',

        work_public_key: 'gpg --armor --export <%= config.work_gpg_short_id %> > <%= config.uploads %>/<%= config.work_gpg_short_id %>.asc',
        work_proof_of_identity: 'gpg -u <%= config.work_gpg_short_id %> -u <%= config.gpg_short_id %> --clearsign  <%= config.uploads %>/proof-of-identity-work.txt',

        bgi_public_key: 'gpg --armor --export <%= config.bgi_gpg_short_id %> > <%= config.uploads %>/<%= config.bgi_gpg_short_id %>.asc',

        obsolete_public_key: 'gpg --armor --export <%= config.obsolete_gpg_short_id %> > <%= config.uploads %>/<%= config.obsolete_gpg_short_id %>.asc',
        obsolete_proof: 'gpg --clearsign -u <%= config.obsolete_gpg_short_id %> -u <%= config.gpg_short_id %> <%= config.uploads %>/obsolete-<%= config.obsolete_gpg_short_id %>-proof.txt'
    };

    grunt.config.set('exec', config);
};
